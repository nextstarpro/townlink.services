import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const PUBLIC_FIELDS = [
  'Provider Name', 'Business Name', 'Region', 'Regions Served', 'City / Town',
  'Service Category', 'Service Categories', 'Specific Services', 'Years of Experience',
  'Min Price (GHS)', 'Max Price (GHS)', 'Price Unit',
  'Availability', 'Serves Diaspora Clients', 'Verified', 'Date Registered',
  'Average Rating', 'Total Jobs Completed', 'Status',
];

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'Provider ID required' }, { status: 400 });
  }

  // Validate it looks like an Airtable record ID
  if (!id.startsWith('rec') || id.length < 10) {
    return NextResponse.json({ success: false, error: 'Invalid provider ID' }, { status: 400 });
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
      .base(process.env.AIRTABLE_BASE_ID as string);

    const record = await base('Service Providers').find(id);

    if (!record) {
      return NextResponse.json({ success: false, error: 'Provider not found' }, { status: 404 });
    }

    const status = record.fields['Status'];

    // Allow both Active and Pending providers through — let the frontend handle display logic
    if (status !== 'Active' && status !== 'Pending') {
      return NextResponse.json({ success: false, error: 'Provider not found' }, { status: 404 });
    }

    // Build safe public object — only approved fields
    const publicData: any = {};
    PUBLIC_FIELDS.forEach(field => {
      if (record.fields[field] !== undefined) {
        publicData[field] = record.fields[field];
      }
    });

    return NextResponse.json({ success: true, provider: publicData });

  } catch (err) {
    console.error('get-provider error:', err);
    return NextResponse.json({ success: false, error: 'Provider not found' }, { status: 404 });
  }
}
