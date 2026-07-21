import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { City } from '../../interfaces/city.model';
import { CityService } from '../../core/services/city.service';

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent implements OnInit {
  cities: City[] = [];
  loading = true;

  constructor(
    private cityService: CityService,
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (res) => {
        // Force this update through NgZone + explicit change detection.
        // Defends against responses (e.g. 304s served from HTTP cache)
        // that occasionally resolve outside Zone.js's patched tasks and
        // wouldn't otherwise trigger a re-render on their own.
        this.zone.run(() => {
          this.cities = res.cities;
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  openCity(slug: string): void {
    this.router.navigate(['/cities', slug]);
  }
}