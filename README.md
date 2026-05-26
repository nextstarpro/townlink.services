# TownLink Monorepo Platform

Welcome to the **TownLink Services** monorepo workspace. This project utilizes a `pnpm` workspaces architecture to structure distinct application layers alongside shared package code.

---

## Workspace Architecture

```
├── apps/
│   ├── web/          # Next.js 16 SSR Marketing & Web App (Port 3000)
│   ├── mobile/       # Next.js 16 Static Export + Capacitor Mobile Shell (Port 3001)
│   └── functions/    # Netlify Serverless API Functions backend
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

### 1. Install Workspace Dependencies
Ensure you have `pnpm` v10+ installed globally. Run the following command from the repository root:
```bash
pnpm install
```

### 2. Environment Variables Configuration
Duplicate the configuration templates in each app space. Create real `.env` files by copying the template profiles:

* **Web Application:**
  * Copy [apps/web/.env.example](file:///d:/WorkSpace/new-project/apps/web/.env.example) to `apps/web/.env`
* **Mobile Application:**
  * Copy [apps/mobile/.env.example](file:///d:/WorkSpace/new-project/apps/mobile/.env.example) to `apps/mobile/.env`
* **Netlify API Serverless Functions:**
  * Copy [apps/functions/.env.example](file:///d:/WorkSpace/new-project/apps/functions/.env.example) to `apps/functions/.env`

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

**To push a live update to all users' phones without Google Play Store review:**
1. Navigate to the mobile app directory:
   ```bash
   cd apps/mobile
   ```
2. Trigger the automated push:
   ```bash
   pnpm ota:push
   ```
   *This command automatically bumps the version, builds the Next.js static export, zips the assets, and uploads the bundle directly to a GitHub Release as a deployment asset.*
3. Commit and push your changes to GitHub as normal.
   *Vercel will deploy the updated `apps/web/public/ota/latest.json` file. The mobile apps will query this endpoint on their next launch and seamlessly download the new update from the GitHub server.*
