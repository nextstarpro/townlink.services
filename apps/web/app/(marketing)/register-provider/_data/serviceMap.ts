export type ServiceCategory = 
  | 'Home Services'
  | 'Beauty & Personal Care'
  | 'Professional Services'
  | 'Events & Catering'
  | 'Transport & Logistics'
  | 'Education & Training'
  | 'Health & Medical'
  | 'Tech & Digital'
  | 'Automotive'
  | 'Construction & Engineering'
  | 'Tailoring & Fashion'
  | 'Financial Services'
  | 'Jobs & Recruitment'
  | 'Security Services'
  | 'Other';

export const serviceMap: Record<ServiceCategory, string[]> = {
  'Home Services': ['Home Services','Plumbing Services','Electrical Services','AC & Refrigeration','Carpentry & Woodwork','Painting & Decoration','Tiling & Flooring','Roofing & Waterproofing','Cleaning Services','Fumigation & Pest Control','Gardening & Landscaping'],
  'Beauty & Personal Care': ['Beauty & Wellness','Hair Styling & Barbering','Makeup & Beauty','Massage & Spa','Nail Services'],
  'Professional Services': ['Professional Services','Legal Services','Accounting & Tax','Consulting','Real Estate & Property','Insurance Services'],
  'Events & Catering': ['Events & Entertainment','Catering Services','Event Planning & Decoration','MC & DJ Services','Photography & Videography','Sound & Lighting','Tent & Chair Rentals'],
  'Transport & Logistics': ['Transportation','Delivery & Courier','Moving & Relocation','Towing Services','Driver Services'],
  'Education & Training': ['Education & Tutoring','Music & Dance Lessons','Driving School','Computer Training','Language Classes'],
  'Health & Medical': ['Health & Medical','Home Nursing','Physiotherapy','Lab Services','Ambulance Services'],
  'Tech & Digital': ['IT & Networking','Phone & Computer Repairs','Web & App Development','Graphic Design','Social Media Management','CCTV & Security Systems'],
  'Automotive': ['Auto Mechanic','Car Wash & Detailing','Auto Electrician','Panel Beating & Spraying','Vulcanizer Services'],
  'Construction & Engineering': ['Building & Construction','Architecture & Design','Surveying Services','Structural Engineering'],
  'Tailoring & Fashion': ['Fashion & Tailoring','Kente Weaving','Embroidery Services','Alterations & Repairs'],
  'Financial Services': ['Financial Services','Mobile Money Services','Microfinance'],
  'Jobs & Recruitment': ['Jobs & Recruitment','Job Seekers','Employers & Recruiters','Freelance & Gig Work'],
  'Security Services': ['Security Services','Mining Security','Corporate Security','Event Security','Residential Security','Security Consulting'],
  'Other': ['Other']
};
