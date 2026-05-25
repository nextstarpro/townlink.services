import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import crypto from 'crypto';

// ── IN-MEMORY RATE LIMITER ──────────────────────────────────────────────────
// Allows max 3 OTP requests per phone number per 10-minute window.
// Resets automatically. Good enough for Serverless environments for a single instance.
const rateLimitMap = new Map<string, { count: number, windowStart: number }>();
const RATE_LIMIT_MAX      = 3;
const RATE_LIMIT_WINDOW   = 10 * 60 * 1000; // 10 minutes

function isRateLimited(phone: string) {
  const now   = Date.now();
  const entry = rateLimitMap.get(phone);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    // First request or window expired — reset
    rateLimitMap.set(phone, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true; // Too many requests in this window
  }

  entry.count++;
  return false;
}
// ───────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    const { phone } = payload;

    if (!phone) {
      return NextResponse.json({ error: 'Phone required' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '').replace(/^0/, '');

    // ── RATE LIMIT CHECK ──
    if (isRateLimited(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Too many OTP requests. Please wait 10 minutes before trying again.' },
        { status: 429 }
      );
    }

    const code      = Math.floor(1000 + Math.random() * 9000).toString();
    const secret    = process.env.VERIFICATION_SECRET || 'townlink-services-2026-secret';
    const expiresAt = Date.now() + 10 * 60 * 1000;

    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${cleanPhone}:${code}:${expiresAt}`)
      .digest('hex');

    const token = Buffer.from(
      JSON.stringify({ phone: cleanPhone, code, expiresAt, signature })
    ).toString('base64');

    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
      .base(process.env.AIRTABLE_BASE_ID as string);

    let isReturning = false;
    let recordId    = null;
    let name        = null;

    const existing = await base('Service Providers')
      .select({ filterByFormula: `OR({Phone / WhatsApp} = '${cleanPhone}', {Phone / WhatsApp} = '+${cleanPhone}')`, maxRecords: 1 })
      .firstPage();

    if (existing.length > 0) {
      isReturning = true;
      recordId    = existing[0].id;
      name        = existing[0].fields['Provider Name'] || null;
    }

    const BMS_API_KEY = process.env.BMS_API_KEY;
    if (!BMS_API_KEY) {
      console.error('BMS_API_KEY not set');
      return NextResponse.json({ success: false, error: 'SMS service not configured' }, { status: 500 });
    }

    const smsMsg = `Your TownLink Services verification code is: ${code}. Valid for 10 minutes. Do not share this code.`;

    const smsRes = await fetch(`https://api.mnotify.com/api/sms/quick?key=${BMS_API_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient:     [cleanPhone],
        sender:        'Town Link',
        message:       smsMsg,
        is_schedule:   false,
        schedule_date: ''
      })
    });

    const smsResult = await smsRes.json();
    console.log('mNotify API response:', JSON.stringify(smsResult));

    if (smsResult.code !== '2000') {
      console.error('mNotify SMS failed:', smsResult);
      return NextResponse.json({ success: false, error: 'Failed to send SMS. Please check your number and try again.' });
    }

    return NextResponse.json({ success: true, token, isReturning, recordId, name });

  } catch (err: any) {
    console.error('send-otp error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
