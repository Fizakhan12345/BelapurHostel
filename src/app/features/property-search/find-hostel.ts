import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CityService } from '../../core/services/city.service';
import { RentType, SearchFilters, SearchProperty, SearchPagination } from '../../interfaces/search.model';
import { City } from '../../interfaces/city.model';
import { PropertySearchService } from '../../core/services/property.search.service';

@Component({
  selector: 'app-find-hostel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-hostel.html',
  styleUrls: ['./find-hostel.css'],
})
export class FindHostelComponent implements OnInit {
  readonly placeholderImage =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#f1eefc"/>
        <g fill="#c9c3e8">
          <path d="M200 110c-27 0-49 22-49 49s22 49 49 49 49-22 49-49-22-49-49-49zm0 78c-16 0-29-13-29-29s13-29 29-29 29 13 29 29-13 29-29 29z"/>
          <rect x="150" y="205" width="100" height="10" rx="5"/>
        </g>
      </svg>
    `);

  rentType: RentType = 'monthly';
  cities: City[] = [];

  filters: SearchFilters = {
    rentType: 'monthly',
    sort: 'newest',
    page: 1,
    limit: 12,
  };

  properties: SearchProperty[] = [];
  pagination: SearchPagination | null = null;
  priceUnit: 'month' | 'day' = 'month';

  loading = true;
  searched = false;

  constructor(
    private searchService: PropertySearchService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (res) => (this.cities = res.cities),
      error: () => {},
    });
    this.runSearch();
  }

  switchRentType(type: RentType): void {
    if (this.rentType === type) return;
    this.rentType = type;
    this.filters.rentType = type;
    // Price range fields tend to mean very different numbers between
    // monthly and daily, so clear them when switching tabs to avoid
    // an old monthly range (e.g. 5000-8000) silently zeroing out
    // every daily result.
    this.filters.minPrice = undefined;
    this.filters.maxPrice = undefined;
    this.filters.page = 1;
    this.runSearch();
  }

  applyFilters(): void {
    this.filters.page = 1;
    this.runSearch();
  }

  goToPage(page: number): void {
    if (!this.pagination || page < 1 || page > this.pagination.totalPages) return;
    this.filters.page = page;
    this.runSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private runSearch(): void {
    this.loading = true;
    this.searchService.search(this.filters).subscribe({
      next: (res) => {
        this.properties = res.properties;
        this.pagination = res.pagination;
        this.priceUnit = res.priceUnit;
        this.loading = false;
        this.searched = true;
      },
      error: () => {
        this.loading = false;
        this.searched = true;
        this.properties = [];
        this.pagination = null;
      },
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }

  viewProperty(id: number): void {
    this.router.navigate(['/properties', id]);
  }
}