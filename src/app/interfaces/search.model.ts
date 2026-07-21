export type RentType = 'monthly' | 'daily';

export interface SearchFilters {
  rentType: RentType;
  citySlug?: string;
  propertyType?: string;
  genderAllowed?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'newest' | 'price_low' | 'price_high' | 'rating';
  page?: number;
  limit?: number;
}

export interface SearchProperty {
  id: number;
  name: string;
  property_type: 'hostel' | 'pg' | 'apartment' | 'room';
  gender_allowed: 'male' | 'female' | 'both';
  rent_type: 'monthly' | 'daily' | 'both';
  area: string;
  city: string;
  avg_rating: number;
  total_reviews: number;
  is_verified: number;
  starting_price: number;
  primary_image: string | null;
}

export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchResponse {
  success: boolean;
  rentType: RentType;
  priceUnit: 'month' | 'day';
  properties: SearchProperty[];
  pagination: SearchPagination;
}