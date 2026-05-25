# Migrate Backend Functions to New Project

We need to migrate the 5 backend functions (`send-otp`, `verify-otp`, `submit-provider`, `get-provider`, `get-providers`) from the old project into the new Next.js project so that the new project is entirely self-contained.

## Proposed Changes

Currently, the frontend relies on calling `/.netlify/functions/:path*`, which we rewrite in `next.config.ts` to point to your live site (`services.townlinkglobal.com`).

To make the backend native to the new project, we have two options. **I highly recommend Option A** as it is the standard way to build Next.js applications and works flawlessly on both Vercel (your current host) and Netlify (your domain host).

### [Recommended] Option A: Convert to Next.js API Routes (Vercel & Netlify Compatible)
Instead of keeping the Netlify-specific `exports.handler` syntax, we convert the 5 files into standard Next.js App Router API endpoints (`app/api/.../route.ts`). 
- **Pros:** It works everywhere. Whether you deploy to Vercel or Netlify, the Next.js framework handles the serverless functions natively. It also works perfectly on your local machine with just `pnpm dev`.
- **Cons:** Requires slight modifications to the code to use standard Web `Request`/`Response` objects instead of Netlify's `event`/`context`. (I will do all of this for you).

### Option B: Keep as Netlify Functions
We copy the `netlify/functions` folder exactly as-is to the root of the new project.
- **Pros:** Zero code changes to the backend files themselves.
- **Cons:** **Will NOT work on Vercel.** You will be forced to host the new Next.js project on Netlify. Also, testing locally requires using the Netlify CLI (`netlify dev`) instead of standard Next.js commands.

## Steps for Option A (Recommended)

1. **Install Dependencies:** Run `pnpm add airtable` in `apps/web`.
2. **Create Next.js API Routes:** Translate the 5 functions into:
   - `apps/web/app/api/send-otp/route.ts`
   - `apps/web/app/api/verify-otp/route.ts`
   - `apps/web/app/api/submit-provider/route.ts`
   - `apps/web/app/api/get-provider/route.ts`
   - `apps/web/app/api/get-providers/route.ts`
3. **Update Next.js Config:** Change the rewrite rule in `next.config.ts` so that calls to `/.netlify/functions/:path*` are internally routed to `/api/:path*`. This ensures **your frontend components don't need to change at all**, fulfilling your requirement that "everything will work without changing anything else."
4. **Environment Variables:** Make sure to add `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `BMS_API_KEY`, and `VERIFICATION_SECRET` to your new hosting environment (Vercel or Netlify).

## Open Questions

> [!IMPORTANT]
> **Which option do you prefer?** 
> 
> If you approve **Option A** (converting to Next.js API Routes), I will proceed with writing the Next.js Route Handlers. 
> If you prefer **Option B** (just copying the folder, meaning you must host on Netlify), let me know and I will just copy them over.
