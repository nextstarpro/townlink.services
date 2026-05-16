import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context) => {
  const body = await req.json().catch(() => ({}));
  const action = (body as Record<string, string>).action;

  if (action === "send-otp") {
    // TODO: integrate real OTP provider (e.g. Twilio, Hubtel)
    return Response.json({ success: true, message: "OTP sent (stub)" });
  }

  if (action === "verify-otp") {
    // TODO: verify against stored OTP
    return Response.json({ success: true, data: { token: "stub-jwt-token" } });
  }

  return Response.json({ success: false, error: "Unknown action" }, { status: 400 });
};
