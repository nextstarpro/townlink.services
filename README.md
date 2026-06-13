# TownLink Monorepo Platform

Welcome to the **TownLink Services** monorepo workspace. This project utilizes a `pnpm` workspaces architecture to structure distinct application layers alongside shared package code.

---

## Workspace Architecture

```
├── apps/
│   ├── web/          # Next.js 16 SSR Marketing & Web App (Port 3000)
│   └── mobile/       # Next.js 16 Static Export + Capacitor Mobile Shell (Port 3001)
├── packages/
│   ├── core/         # Constants, Ghana Formatters, Shared Interfaces
│   ├── ui/           # DM Sans Design Tokens, Brand Buttons, Inputs & Hooks
│   ├── validators/   # Zod schema validation structures
│   ├── api-client/   # Base HTTP API Client
│   └── config/       # Shared TSConfig & Prettier setup
└── capacitor/        # Legacy build root (All configs are co-located in apps/mobile now)
```

---

## Getting Started (Onboarding Guide)

Follow these manual steps strictly to configure the workspace environment successfully.

### 1. Sync the Codebase
Before installing dependencies, ensure your local repository is up to date:
```bash
git pull origin main
```

### 2. Install Workspace Dependencies
Ensure you have `pnpm` v10+ installed globally. Run the following command from the repository root:
```bash
pnpm install
```

### 3. Environment Variables Configuration
Duplicate the configuration templates in each app space. Create real `.env` files by copying the template profiles:

* **Web Application:**
  * Copy [apps/web/.env.example](file:///d:/WorkSpace/new-project/apps/web/.env.example) to `apps/web/.env`
* **Mobile Application:**
  * Copy [apps/mobile/.env.example](file:///d:/WorkSpace/new-project/apps/mobile/.env.example) to `apps/mobile/.env`

---

## Development Scripts

Once the environment setups are complete, you can trigger applications locally from the root workspace directory:

### Run Web Client (SSR)
Runs the Next.js web application on `http://localhost:3000`.
```bash
pnpm dev
```

### Run Mobile Client (Dev Preview)
Runs the Next.js static dev environment inside your browser on `http://localhost:3001`.
```bash
pnpm dev:mobile
```

---

## Mobile Deployment & Native Compilation (Option A)

To run the mobile shell on a native Android platform, developers must build the assets and compile locally using Android Studio:

### 1. Compile the Static Next.js Bundle
Export the Next.js pages statically into the target `out/` folder:
```bash
pnpm build:mobile
```

### 2. Sync Assets to Android Platform
Push the static resources and native Capacitor plugin bridges into the compiled native project files:
```bash
npx cap sync android
```
*(Run from inside the `apps/mobile/` directory).*

### 3. Open Project in Android Studio
1. Open Android Studio on your workstation.
2. Select **Open an Existing Project**.
3. Choose the directory: `apps/mobile/android`.
4. Press the **Run** button to compile the debug APK and load it onto your physical device.

### 4. Over-The-Air (OTA) Updates (Free Custom Pipeline)
We have implemented a custom 100% free OTA update pipeline that completely bypasses Capgo Cloud. This prevents repository bloat by utilizing GitHub Releases as the storage host, while the Next.js web backend serves the `latest.json` configuration file.

**Prerequisite:** Ensure you have added a Fine-Grained GitHub Personal Access Token (with `Contents: Read and Write` permissions on this repository) to `apps/mobile/.env` as `GITHUB_TOKEN=github_pat_...`.

#### Pushing a Live Update
1. Navigate to the mobile app directory:
   ```bash
   cd apps/mobile
   ```
2. Trigger the automated push:
   ```bash
   pnpm ota:push
   ```
   *This command automatically bumps the version, builds the Next.js static export, zips the assets, computes a SHA256 checksum, and uploads the bundle to a GitHub Release.*
3. Commit and push your changes to GitHub as normal.
   *Vercel will deploy the updated `apps/web/public/ota/latest.json` file. The mobile apps will query this endpoint on their next launch and seamlessly download the new update from the GitHub server.*

#### Rolling Back a Broken Update
If you push a broken update and need to revert to a previous version:
```bash
cd apps/mobile
pnpm ota:rollback 8.0.3
```
Replace `8.0.3` with whatever version you want to roll back to. You can find all available versions at the [GitHub Releases page](https://github.com/nextstarpro/townlink.services/releases). After rolling back, commit and push so Vercel deploys the reverted `latest.json`.

> **Automatic Safety Net:** The `@capgo/capacitor-updater` plugin has built-in crash protection. If a new update causes the app to crash before `notifyAppReady()` fires (within 10 seconds of launch), the plugin automatically rolls back to the previous working version on the user's phone — no action needed from you.

#### How It Works Behind the Scenes
1. `pnpm ota:push` builds the static export, zips `out/`, and computes a SHA256 checksum.
2. The script creates a GitHub Release (e.g., `ota-v8.0.4`) and uploads `update.zip` as a release asset.
3. It writes `apps/web/public/ota/latest.json` with `{version, url, checksum}`.
4. After you `git push`, Vercel deploys the web app, making `latest.json` publicly available at `https://services.townlinkglobal.com/ota/latest.json`.
5. On the user's next app launch, the Capgo updater plugin fetches `latest.json`, compares versions, downloads the zip from GitHub, verifies the SHA256 checksum, and applies the update silently.

#### Storage
Each push creates a new GitHub Release (~5-15MB each). GitHub has no hard cap on release storage. Old releases can be cleaned up anytime from the [Releases page](https://github.com/nextstarpro/townlink.services/releases).

