import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityDetailResponse, CityFilters, CityListResponse } from '../../interfaces/city.model';
import { environment } from '../../../environment';


@Injectable({ providedIn: 'root' })
export class CityService {
  private baseUrl = `${environment.apiUrl}/cities`;

  constructor(private http: HttpClient) {}

  /** Navbar dropdown + homepage "Popular" chips */
  getCities(featuredOnly = false): Observable<CityListResponse> {
    let params = new HttpParams();
    if (featuredOnly) params = params.set('featured', '1');
    return this.http.get<CityListResponse>(this.baseUrl, { params });
  }

  /** Dynamic /cities/:slug page */
  getCityBySlug(slug: string, filters: CityFilters = {}): Observable<CityDetailResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<CityDetailResponse>(`${this.baseUrl}/${slug}`, { params });
  }
}