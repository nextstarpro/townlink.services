import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    const { isReturning, existingRecordId, ...fields } = payload;

    // Normalise phone — strip + prefix for consistent storage
    if (fields['Phone / WhatsApp']) {
      fields['Phone / WhatsApp'] = fields['Phone / WhatsApp'].replace(/^\+/, '');
    }

    // Handle multi-select fields — ensure they are arrays
    if (fields['Regions Served'] && !Array.isArray(fields['Regions Served'])) {
      fields['Regions Served'] = [fields['Regions Served']];
    }
    if (fields['Service Categories'] && !Array.isArray(fields['Service Categories'])) {
      fields['Service Categories'] = [fields['Service Categories']];
    }

    // Keep legacy single-select fields in sync
    if (fields['Regions Served'] && fields['Regions Served'].length > 0) {
      fields['Region'] = fields['Regions Served'][0];
    }

    const LEGACY_CATEGORY_OPTIONS = [
      'Home Services', 'Beauty & Personal Care', 'Professional Services',
      'Events & Catering', 'Transport & Logistics', 'Education & Training',
      'Health & Medical', 'Tech & Digital', 'Automotive',
      'Construction & Engineering', 'Tailoring & Fashion', 'Financial Services',
      'Jobs & Recruitment', 'Security Services',
      'Cleaning Services', 'Agriculture', 'Legal & Business', 'Other'
    ];
    if (fields['Service Categories'] && fields['Service Categories'].length > 0) {
      const firstCat = fields['Service Categories'][0];
      fields['Service Category'] = LEGACY_CATEGORY_OPTIONS.includes(firstCat) ? firstCat : 'Other';
    }

    const cleanFields: any = {};
    for (const [key, val] of Object.entries(fields)) {
      if (val !== null && val !== undefined && val !== '') {
        cleanFields[key] = val;
      }
    }

    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
      .base(process.env.AIRTABLE_BASE_ID as string);

    // SERVER-SIDE duplicate check — never trust isReturning/existingRecordId from client
    const phone = cleanFields['Phone / WhatsApp'];
    let resolvedRecordId: string | null = null;
    let existingFields: any = null;

    if (phone) {
      const existing = await base('Service Providers')
        .select({
          filterByFormula: `OR({Phone / WhatsApp} = '${phone}', {Phone / WhatsApp} = '+${phone}')`,
          maxRecords: 1
        })
        .firstPage();

      if (existing.length > 0) {
        resolvedRecordId = existing[0].id;
        existingFields = existing[0].fields;
      }
    }

    // ── TRUE returning provider flag (server-side, not from client) ──
    const isActuallyReturning = !!resolvedRecordId;
    let recordId;

    if (isActuallyReturning) {
      // ── Check current status and Ghana Card identity before deciding what to write ──
      const currentStatus   = existingFields['Status']                 || 'Pending';
      const currentVerified = existingFields['Verified']               || false;
      const currentCardNo   = existingFields['Ghana Card Number']      || '';
      const currentExpiry   = existingFields['Ghana Card Expiry Date'] || '';

      const incomingCardNo  = cleanFields['Ghana Card Number']         || '';
      const incomingExpiry  = cleanFields['Ghana Card Expiry Date']    || '';

      // Identity changed = new Ghana Card number OR new expiry date (non-empty and different)
      const cardNumberChanged = incomingCardNo && incomingCardNo !== currentCardNo;
      const cardExpiryChanged = incomingExpiry && incomingExpiry !== currentExpiry;
      const identityChanged   = cardNumberChanged || cardExpiryChanged;

      let newStatus: string;
      let newVerified: boolean;

      if (currentStatus === 'Active' && !identityChanged) {
        // Active provider, no Ghana Card change — preserve their status and verified badge
        newStatus   = currentStatus;
        newVerified = currentVerified;
      } else {
        // Either not Active yet, or Ghana Card identity changed — trigger re-verification
        newStatus   = 'Pending';
        newVerified = false;
      }

      const updated = await base('Service Providers').update(resolvedRecordId as string, {
        ...cleanFields,
        'Status':              newStatus,
        'Verified':            newVerified,
        'Verification method': 'Self-submitted via townlink.app'
      });
      recordId = updated.id;
    } else {
      // Brand new registration — always starts as Pending
      const created = await base('Service Providers').create([{
        fields: {
          ...cleanFields,
          'Status':              'Pending',
          'Verified':            false,
          'Verification method': 'Self-submitted via townlink.app'
        }
      }]);
      recordId = created[0].id;
    }

    // ── SEND APPROPRIATE SMS BASED ON ACTUAL STATUS ──
    const name = cleanFields['Provider Name'] || 'there';
    const BMS_API_KEY = process.env.BMS_API_KEY;

    let smsMessage;

    if (!isActuallyReturning) {
      // New registration — full welcome with Ghana Card request
      smsMessage = `Hello ${name} 👋\n\nThank you for registering with *TownLink Services*!\n\nYour listing is under review. To receive your ✅ *Verified* badge, please send a clear photo of your Ghana Card (front and back) to our WhatsApp: *+233 27 487 0179*\n\nWe will review it and confirm your listing within 24 hours.\n\n– TownLink Team`;
    } else if (
      existingFields['Status'] === 'Active' &&
      !(cleanFields['Ghana Card Number'] && cleanFields['Ghana Card Number'] !== existingFields['Ghana Card Number']) &&
      !(cleanFields['Ghana Card Expiry Date'] && cleanFields['Ghana Card Expiry Date'] !== existingFields['Ghana Card Expiry Date'])
    ) {
      // Active provider, non-critical update — no re-review needed
      smsMessage = `Hi ${name} 👋\n\nYour TownLink Services profile has been updated successfully. No further action needed.\n\nQuestions? WhatsApp us: +233 27 487 0179\n\n– TownLink Team`;
    } else {
      // Returning provider whose card changed or was previously Pending/Suspended
      smsMessage = `Hi ${name} 👋\n\nYour TownLink Services profile has been updated and is under review.\n\nWe'll notify you once your changes are live. Questions? WhatsApp us: +233 27 487 0179\n\n– TownLink Team`;
    }

    if (BMS_API_KEY) {
      await fetch(`https://api.mnotify.com/api/sms/quick?key=${BMS_API_KEY}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient:     [cleanFields['Phone / WhatsApp']],
          sender:        'Town Link',
          message:       smsMessage,
          is_schedule:   false,
          schedule_date: ''
        })
      });
    }

    return NextResponse.json({ success: true, recordId, isReturning: isActuallyReturning });

  } catch (err: any) {
    console.error('submit-provider error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
