import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

const owner = 'nextstarpro';
const repo = 'townlink.services';

// ── 0. Ensure GITHUB_TOKEN is present ──────────────────────────────────────
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

// ── 1. Bump version (0.0.1 patch increment) ───────────────────────────────
// Ensures semver format: e.g. "8.3.0" → "8.3.1", "8.0.1" → "8.0.2"
// If version only has two parts (e.g. "8.3"), normalise to "8.3.0" first.
const versionParts = pkg.version.split('.');
while (versionParts.length < 3) versionParts.push('0');
versionParts[2] = parseInt(versionParts[2], 10) + 1;
const newVersion = versionParts.join('.');
pkg.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✅ Bumped version to ${newVersion}`);

// ── 2. Verify the static export exists ─────────────────────────────────────
const outDir = path.join(mobileDir, 'out');
if (!fs.existsSync(outDir)) {
  console.error("❌ Error: 'out' directory not found. Did the build fail?");
  process.exit(1);
}

// Verify index.html is at the root of the export (required by Capgo)
if (!fs.existsSync(path.join(outDir, 'index.html'))) {
  console.error("❌ Error: 'out/index.html' not found. The Capgo updater requires index.html at the zip root.");
  process.exit(1);
}

// ── 3. Zip the out folder ──────────────────────────────────────────────────
const zipPath = path.join(mobileDir, 'update.zip');

await new Promise((resolve, reject) => {
  console.log(`📦 Zipping ${outDir} to update.zip...`);
  const output = fs.createWriteStream(zipPath);
  const archive = new ZipArchive({ zlib: { level: 9 } });

  output.on('close', resolve);
  archive.on('error', reject);

  archive.pipe(output);
  archive.directory(outDir, false); // false = no wrapping parent directory
  archive.finalize();
});
console.log(`✅ Zipped successfully.`);

// ── 4. Compute SHA256 checksum (REQUIRED by @capgo/capacitor-updater v7) ──
const zipBuffer = fs.readFileSync(zipPath);
const checksum = crypto.createHash('sha256').update(zipBuffer).digest('hex');
console.log(`🔒 SHA256 checksum: ${checksum}`);

// ── 5. Create GitHub Release ───────────────────────────────────────────────
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

// ── 6. Upload zip asset ────────────────────────────────────────────────────
console.log(`📤 Uploading update.zip to GitHub Release asset...`);

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

// ── 7. Update latest.json in web backend ───────────────────────────────────
// This file is served by Vercel at: https://services.townlinkglobal.com/ota/latest.json
// The Capgo plugin fetches this on every app launch to check for updates.
//
// Required fields for @capgo/capacitor-updater v7 self-hosted mode:
//   - version  (semver string)
//   - url      (direct HTTPS link to the .zip bundle)
//   - checksum (SHA256 hex digest of the .zip file)
const webOtaDir = path.join(mobileDir, '..', 'web', 'public', 'ota');
if (!fs.existsSync(webOtaDir)) {
  fs.mkdirSync(webOtaDir, { recursive: true });
}

const latestJsonPath = path.join(webOtaDir, 'latest.json');
const latestJson = {
  version: newVersion,
  url: assetDownloadUrl,
  checksum: checksum
};

fs.writeFileSync(latestJsonPath, JSON.stringify(latestJson, null, 2) + '\n');
console.log(`✅ Updated apps/web/public/ota/latest.json`);

// ── 8. Clean up ────────────────────────────────────────────────────────────
fs.unlinkSync(zipPath);
console.log('');
console.log(`🎉 OTA Push Complete!`);
console.log(`   Version:  ${newVersion}`);
console.log(`   Tag:      ${tag}`);
console.log(`   Checksum: ${checksum}`);
console.log('');
console.log(`👉 Next steps:`);
console.log(`   1. git add -A && git commit -m "ota: v${newVersion}"`);
console.log(`   2. git push`);
console.log(`   Vercel will deploy the updated latest.json. Users get the update on next app launch.`);
