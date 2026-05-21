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

### 4. Over-The-Air Sandbox Pushes (Capgo OTA)
After the base APK is running on a device, you do not need to compile via Android Studio again unless you add a native package. Run the sandbox OTA upload to test UI changes instantly:
```bash
pnpm mobile:sandbox
```
This pushes your latest build state to Capgo Cloud's `development` track immediately.
