export interface City {
  id: number;
  name: string;
  slug: string;
  state: string | null;
  banner_image_url: string | null;
  thumb_image_url: string | null;
  short_description: string | null;
  is_featured?: number;
  sort_order?: number;
  property_count: number;
}

export interface CityProperty {
  id: number;
  name: string;
  property_type: 'hostel' | 'pg' | 'apartment' | 'room';
  gender_allowed: 'male' | 'female' | 'both';
  area: string;
  city: string;
  monthly_rent: number;
  security_deposit: number;
  avg_rating: number;
  total_reviews: number;
  is_verified: number;
  is_featured: number;
  primary_image: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CityDetailResponse {
  success: boolean;
  city: City;
  properties: CityProperty[];
  pagination: Pagination;
}

export interface CityListResponse {
  success: boolean;
  cities: City[];
}

export interface CityFilters {
  page?: number;
  limit?: number;
  propertyType?: string;
  genderAllowed?: string;
  minRent?: number;
  maxRent?: number;
  sort?: 'newest' | 'rent_low' | 'rent_high' | 'rating';
}