import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environment';


export interface Amenity {
  id: number;
  name: string;
  category: string | null;
  property_count?: number; // present only when with_counts=1
}

export interface AmenityWithProperties extends Amenity {
  properties: {
    id: number;
    name: string;
    city: string;
    area: string;
  }[];
}

export interface GroupedAmenities {
  [category: string]: { id: number; name: string }[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  private baseUrl = `${environment.apiUrl}/amenities`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/amenities
   * Flat list of all amenities. Optionally filter by category
   * and/or include a live property_count per amenity.
   */
  getAmenities(options?: { category?: string; withCounts?: boolean }): Observable<Amenity[]> {
    let params = new HttpParams();
    if (options?.category)  params = params.set('category', options.category);
    if (options?.withCounts) params = params.set('with_counts', '1');

    return this.http
      .get<ApiResponse<Amenity[]>>(this.baseUrl, { params })
      .pipe(map(res => res.data));
  }

  /**
   * GET /api/amenities/grouped
   * Amenities grouped by category — e.g. { connectivity: [...], comfort: [...] }
   * Use this for rendering labeled checkbox sections on the property form.
   */
  getGroupedAmenities(): Observable<GroupedAmenities> {
    return this.http
      .get<ApiResponse<GroupedAmenities>>(`${this.baseUrl}/grouped`)
      .pipe(map(res => res.data));
  }

  /**
   * GET /api/amenities/:id
   * Single amenity plus a sample of properties that offer it.
   */
  getAmenityById(id: number): Observable<AmenityWithProperties> {
    return this.http
      .get<ApiResponse<AmenityWithProperties>>(`${this.baseUrl}/${id}`)
      .pipe(map(res => res.data));
  }

  /**
   * POST /api/amenities  (Admin only — requires auth token via interceptor)
   */
  createAmenity(name: string, category?: string): Observable<{ amenity_id: number; message: string }> {
    return this.http
      .post<ApiResponse<any> & { amenity_id: number; message: string }>(this.baseUrl, { name, category })
      .pipe(map(res => ({ amenity_id: res.amenity_id, message: res.message! })));
  }

  /**
   * PUT /api/amenities/:id  (Admin only)
   */
  updateAmenity(id: number, changes: { name?: string; category?: string }): Observable<{ message: string }> {
    return this.http
      .put<ApiResponse<any> & { message: string }>(`${this.baseUrl}/${id}`, changes)
      .pipe(map(res => ({ message: res.message! })));
  }

  /**
   * DELETE /api/amenities/:id  (Admin only)
   */
  deleteAmenity(id: number): Observable<{ message: string }> {
    return this.http
      .delete<ApiResponse<any> & { message: string }>(`${this.baseUrl}/${id}`)
      .pipe(map(res => ({ message: res.message! })));
  }
}