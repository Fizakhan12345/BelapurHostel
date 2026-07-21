import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchFilters, SearchResponse } from '../../interfaces/search.model';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class PropertySearchService {
  private baseUrl = `${environment.apiUrl}/properties/search`;

  constructor(private http: HttpClient) {}

  search(filters: SearchFilters): Observable<SearchResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<SearchResponse>(this.baseUrl, { params });
  }
}