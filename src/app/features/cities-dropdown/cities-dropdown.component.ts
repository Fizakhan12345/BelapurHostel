import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CityService } from '../../core/services/city.service';
import { City } from '../../interfaces/city.model';

@Component({
  selector: 'app-cities-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cities-dropdown.component.html',
  styleUrls: ['./cities-dropdown.component.scss'],
})
export class CitiesDropdownComponent implements OnInit {
  cities: City[] = [];
  isOpen = false;
  loading = false;

  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.cityService.getCities().subscribe({
      next: (res) => {
        this.cities = res.cities;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  selectCity(slug: string): void {
    this.isOpen = false;
    this.router.navigate(['/cities', slug]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.cities-dropdown')) {
      this.isOpen = false;
    }
  }
}