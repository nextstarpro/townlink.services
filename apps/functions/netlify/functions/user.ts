import type { Context } from "@netlify/functions";

export default async (_req: Request, _context: Context) => {
  // TODO: connect to Airtable/Supabase/MongoDB
  return Response.json({
    success: true,
    data: {
      id: "stub-user-id",
      fullName: "Kwame Asante",
      phone: "+233241234567",
      verified: false,
      diaspora: false,
      services: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
};
