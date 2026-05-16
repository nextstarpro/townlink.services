// User types shared across the platform

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  region?: string;
  businessName?: string;
  ghanaCardNumber?: string;
  ghanaCardExpiry?: string;
  avatarUrl?: string;
  verified: boolean;
  diaspora: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceProvider extends User {
  services: string[];
  availability: string[];
  priceRange?: { min: number; max: number; currency: string };
  bio?: string;
  rating?: number;
  reviewCount?: number;
}
