import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    const { token, otp } = payload;

    if (!token || !otp) {
      return NextResponse.json({ error: 'Token and OTP required' }, { status: 400 });
    }

    const secret  = process.env.VERIFICATION_SECRET || 'townlink-services-2026-secret';
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const { phone, code, expiresAt, signature } = decoded;

    // Recompute and compare signature
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${phone}:${code}:${expiresAt}`)
      .digest('hex');

    if (expected !== signature) {
      return NextResponse.json({ success: false, error: 'Invalid token' });
    }

    // Check expiry
    if (Date.now() > expiresAt) {
      return NextResponse.json({ success: false, error: 'Code expired' });
    }

    // Check OTP matches
    if (otp.trim() !== code) {
      return NextResponse.json({ success: false, error: 'Incorrect code' });
    }

    // Fetch existing provider record if returning
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
      .base(process.env.AIRTABLE_BASE_ID as string);

    let record = null;
    const existing = await base('Service Providers')
      .select({ filterByFormula: `OR({Phone / WhatsApp} = '${phone}', {Phone / WhatsApp} = '+${phone}')`, maxRecords: 1 })
      .firstPage();

    if (existing.length > 0) {
      record = { id: existing[0].id, ...existing[0].fields };
    }

    return NextResponse.json({ success: true, record });

  } catch (err: any) {
    console.error('verify-otp error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
