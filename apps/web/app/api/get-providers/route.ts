import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const PUBLIC_FIELDS = [
  'Provider Name', 'Business Name', 'Region', 'Regions Served', 'City / Town',
  'Service Category', 'Service Categories', 'Specific Services', 'Years of Experience',
  'Min Price (GHS)', 'Max Price (GHS)', 'Price Unit',
  'Availability', 'Serves Diaspora Clients', 'Verified', 'Date Registered',
  'Average Rating', 'Total Jobs Completed',
];

export async function GET() {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
      .base(process.env.AIRTABLE_BASE_ID as string);

    const records = await base('Service Providers')
      .select({
        filterByFormula: `{Status} = 'Active'`,
        fields: [...PUBLIC_FIELDS],
        maxRecords: 500
      })
      .all();

    const providers = records.map(r => ({
      id:           r.id,
      name:         r.fields['Provider Name'] || '',
      business:     r.fields['Business Name'] || '',
      region:       r.fields['Region'] || '',
      regions:      r.fields['Regions Served'] || [],
      city:         r.fields['City / Town'] || '',
      category:     r.fields['Service Category'] || '',
      categories:   r.fields['Service Categories'] || [],
      services:     r.fields['Specific Services'] || '',
      experience:   r.fields['Years of Experience'] || null,
      minPrice:     r.fields['Min Price (GHS)'] || null,
      maxPrice:     r.fields['Max Price (GHS)'] || null,
      priceUnit:    r.fields['Price Unit'] || '',
      availability: r.fields['Availability'] || '',
      diaspora:     r.fields['Serves Diaspora Clients'] || false,
      verified:     r.fields['Verified'] || false,
      dateJoined:   r.fields['Date Registered'] || '',
      rating:       r.fields['Average Rating'] || 0,
      totalJobs:    r.fields['Total Jobs Completed'] || 0,
    }));

    return NextResponse.json({ success: true, providers, total: providers.length });

  } catch (err) {
    console.error('get-providers error:', err);
    return NextResponse.json({ success: false, error: 'Could not load providers' }, { status: 500 });
  }
}
