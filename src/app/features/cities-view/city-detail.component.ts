import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { City, CityProperty, Pagination, CityFilters } from '../../interfaces/city.model';
import { CityService } from '../../core/services/city.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
})
export class CityDetailComponent implements OnInit {
  // Inline SVG placeholder — always works even if no image URL exists
  // or a real image URL 404s. No dependency on an /assets file.
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

  city: City | null = null;
  properties: CityProperty[] = [];
  pagination: Pagination | null = null;

  loading = true;
  notFound = false;

  slug = '';
  filters: CityFilters = { page: 1, limit: 12, sort: 'newest' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    // Read the slug once — fine for a page the user lands on directly.
    // (If you later add "related cities" links that jump from one
    // city page straight to another without leaving this component,
    // switch back to the paramMap-based version so it re-fetches on
    // param change instead of only on first load.)
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.loadCity();
  }

  private loadCity(): void {
    this.loading = true;
    this.notFound = false;

    this.cityService.getCityBySlug(this.slug, this.filters).subscribe({
      next: (res) => {
        this.city = res.city;
        this.properties = res.properties;
        this.pagination = res.pagination;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.notFound = err.status === 404;
      },
    });
  }

  applyFilters(): void {
    this.filters.page = 1;
    this.loadCity();
  }

  goToPage(page: number): void {
    if (!this.pagination || page < 1 || page > this.pagination.totalPages) return;
    this.filters.page = page;
    this.loading = true;

    this.cityService.getCityBySlug(this.slug, this.filters).subscribe((res) => {
      this.properties = res.properties;
      this.pagination = res.pagination;
      this.loading = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }

  viewProperty(id: number): void {
    this.router.navigate(['/properties', id]);
  }
}