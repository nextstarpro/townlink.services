import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * OTA Rollback Script
 * 
 * Usage:  node scripts/rollback-ota.mjs <version>
 * Example: node scripts/rollback-ota.mjs 8.0.3
 * 
 * This downloads the update.zip from an existing GitHub Release,
 * recomputes its checksum, and rewrites latest.json to point to it.
 * Then you just commit + push so Vercel deploys the rollback.
 */

const owner = 'nextstarpro';
const repo = 'townlink.services';

// ── Parse target version from CLI args ─────────────────────────────────────
const targetVersion = process.argv[2];
if (!targetVersion) {
  console.error('❌ Usage: node scripts/rollback-ota.mjs <version>');
  console.error('   Example: node scripts/rollback-ota.mjs 8.0.3');
  console.error('');
  console.error('   This rolls back to an existing OTA release.');
  console.error('   Check your releases at: https://github.com/nextstarpro/townlink.services/releases');
  process.exit(1);
}

// ── Read GITHUB_TOKEN ──────────────────────────────────────────────────────
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^GITHUB_TOKEN=(.*)$/m);
    if (match) GITHUB_TOKEN = match[1].trim();
  }
}
if (!GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN not found. Add it to apps/mobile/.env");
  process.exit(1);
}

// ── Find the GitHub Release ────────────────────────────────────────────────
const tag = `ota-v${targetVersion}`;
console.log(`🔍 Looking for release: ${tag}...`);

const releaseRes = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`,
  {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }
);

if (!releaseRes.ok) {
  console.error(`❌ Release "${tag}" not found (${releaseRes.status}).`);
  console.error(`   Check available releases: https://github.com/${owner}/${repo}/releases`);
  process.exit(1);
}

const releaseData = await releaseRes.json();
const asset = releaseData.assets?.find((a) => a.name === 'update.zip');
if (!asset) {
  console.error(`❌ Release "${tag}" exists but has no update.zip asset.`);
  process.exit(1);
}

const assetDownloadUrl = asset.browser_download_url;
console.log(`✅ Found release: ${releaseData.name}`);
console.log(`   Asset URL: ${assetDownloadUrl}`);

// ── Download the zip to compute checksum ───────────────────────────────────
console.log(`⬇️  Downloading update.zip to verify checksum...`);
const zipRes = await fetch(assetDownloadUrl);
if (!zipRes.ok) {
  console.error(`❌ Failed to download update.zip (${zipRes.status})`);
  process.exit(1);
}
const zipBuffer = Buffer.from(await zipRes.arrayBuffer());
const checksum = crypto.createHash('sha256').update(zipBuffer).digest('hex');
console.log(`🔒 SHA256: ${checksum}`);

// ── Rewrite latest.json ────────────────────────────────────────────────────
const mobileDir = process.cwd();
const webOtaDir = path.join(mobileDir, '..', 'web', 'public', 'ota');
if (!fs.existsSync(webOtaDir)) {
  fs.mkdirSync(webOtaDir, { recursive: true });
}

const latestJsonPath = path.join(webOtaDir, 'latest.json');
const latestJson = {
  version: targetVersion,
  url: assetDownloadUrl,
  checksum: checksum,
};

fs.writeFileSync(latestJsonPath, JSON.stringify(latestJson, null, 2) + '\n');
console.log(`✅ Updated apps/web/public/ota/latest.json → v${targetVersion}`);
console.log('');
console.log(`👉 Next steps:`);
console.log(`   1. git add -A && git commit -m "ota: rollback to v${targetVersion}"`);
console.log(`   2. git push`);
console.log(`   Vercel will deploy the rolled-back latest.json. Users get the fix on next app launch.`);
