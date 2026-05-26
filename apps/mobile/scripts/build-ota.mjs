import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const owner = 'nextstarpro';
const repo = 'townlink.services';

// Ensure GITHUB_TOKEN is present
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Fallback: Manually read .env file since this is a vanilla Node script
if (!GITHUB_TOKEN) {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^GITHUB_TOKEN=(.*)$/m);
    if (match) GITHUB_TOKEN = match[1].trim();
  }
}

if (!GITHUB_TOKEN) {
  console.error("❌ Error: GITHUB_TOKEN is not set in your environment or .env file.");
  console.error("Please add GITHUB_TOKEN=your_token to apps/mobile/.env before running this command.");
  process.exit(1);
}

const mobileDir = process.cwd();
const packageJsonPath = path.join(mobileDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 1. Bump version
const versionParts = pkg.version.split('.');
versionParts[2] = parseInt(versionParts[2], 10) + 1;
const newVersion = versionParts.join('.');
pkg.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✅ Bumped version to ${newVersion}`);

// 2. Zip the out folder
const outDir = path.join(mobileDir, 'out');
const zipPath = path.join(mobileDir, 'update.zip');

if (!fs.existsSync(outDir)) {
  console.error("❌ Error: 'out' directory not found. Did the build fail?");
  process.exit(1);
}

await new Promise((resolve, reject) => {
  console.log(`📦 Zipping ${outDir} to update.zip...`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', resolve);
  archive.on('error', reject);

  archive.pipe(output);
  archive.directory(outDir, false);
  archive.finalize();
});
console.log(`✅ Zipped successfully.`);

// 3. Create GitHub Release
console.log(`🚀 Creating GitHub Release v${newVersion}...`);
const tag = `ota-v${newVersion}`;

const releaseRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tag_name: tag,
    name: `OTA Update v${newVersion}`,
    body: `Automated OTA update for mobile app v${newVersion}`,
    draft: false,
    prerelease: false
  })
});

if (!releaseRes.ok) {
  const err = await releaseRes.text();
  console.error(`❌ Failed to create release: ${releaseRes.status} ${err}`);
  process.exit(1);
}

const releaseData = await releaseRes.json();
const uploadUrlTemplate = releaseData.upload_url; 
const uploadUrl = uploadUrlTemplate.replace('{?name,label}', '?name=update.zip');

// 4. Upload zip asset
console.log(`📤 Uploading update.zip to GitHub Release asset...`);
const zipBuffer = fs.readFileSync(zipPath);

const uploadRes = await fetch(uploadUrl, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/zip'
  },
  body: zipBuffer
});

if (!uploadRes.ok) {
  const err = await uploadRes.text();
  console.error(`❌ Failed to upload asset: ${uploadRes.status} ${err}`);
  process.exit(1);
}

const assetData = await uploadRes.json();
const assetDownloadUrl = assetData.browser_download_url;
console.log(`✅ Uploaded successfully! URL: ${assetDownloadUrl}`);

// 5. Update latest.json in web backend
const webOtaDir = path.join(mobileDir, '..', 'web', 'public', 'ota');
if (!fs.existsSync(webOtaDir)) {
  fs.mkdirSync(webOtaDir, { recursive: true });
}

const latestJsonPath = path.join(webOtaDir, 'latest.json');
const latestJson = {
  version: newVersion,
  url: assetDownloadUrl
};

fs.writeFileSync(latestJsonPath, JSON.stringify(latestJson, null, 2) + '\n');
console.log(`✅ Updated apps/web/public/ota/latest.json`);

// Clean up local zip
fs.unlinkSync(zipPath);
console.log(`🎉 OTA Push Complete! Your Next.js backend is ready.`);
console.log(`👉 Next steps: Commit the changes and push to GitHub so Vercel can host the new latest.json file.`);
