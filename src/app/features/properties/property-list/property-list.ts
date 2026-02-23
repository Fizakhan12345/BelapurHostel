// browse-stays.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  name: string;
  type: string;
  gender: string;
  verified: boolean;
  rating: number;
  reviews: number;
  location: string;
  area: string;
  distance: string;
  price: number;
  deposit: number;
  image: string;
  amenities: string[];
  available: number;
}

@Component({
  selector: 'app-browse-stays',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class BrowseStaysComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  
  // Filter states
  searchQuery: string = '';
  selectedGender: string = '';
  selectedType: string = '';
  minPrice: number = 0;
  maxPrice: number = 50000;
  selectedAmenities: string[] = [];
  sortBy: string = 'relevance';
  viewMode: string = 'grid';

  // Available options
  genderOptions = ['Boys', 'Girls', 'Boys & Girls'];
  typeOptions = ['Premium PG', 'Standard PG', 'Budget PG', 'Hostel', 'Flat'];
  amenityOptions = [
    'WiFi', 'AC', 'Meals', 'Parking', 'Laundry', 
    'Gym', 'Power Backup', 'CCTV', 'Housekeeping'
  ];
  sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'popularity', label: 'Popularity' }
  ];

  showFilters: boolean = false;
  loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    
    // Mock data
    this.properties = [
      {
        id: 1,
        name: "Sunrise Heights PG",
        type: "Premium PG",
        gender: "Boys & Girls",
        verified: true,
        rating: 4.8,
        reviews: 156,
        location: "Andheri West",
        area: "Near Metro Station",
        distance: "500m from Andheri Metro",
        price: 12000,
        deposit: 24000,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "Parking", "CCTV"],
        available: 6
      },
      {
        id: 2,
        name: "Comfort Living PG",
        type: "Standard PG",
        gender: "Boys",
        verified: true,
        rating: 4.5,
        reviews: 89,
        location: "Bandra West",
        area: "Near Railway Station",
        distance: "800m from Bandra Station",
        price: 10000,
        deposit: 20000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        amenities: ["WiFi", "Meals", "Laundry", "Power Backup"],
        available: 4
      },
      {
        id: 3,
        name: "Urban Nest PG",
        type: "Premium PG",
        gender: "Girls",
        verified: true,
        rating: 4.9,
        reviews: 203,
        location: "Powai",
        area: "Near Tech Park",
        distance: "1km from Powai Lake",
        price: 15000,
        deposit: 30000,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "Gym", "CCTV", "Housekeeping"],
        available: 3
      },
      {
        id: 4,
        name: "Budget Stay PG",
        type: "Budget PG",
        gender: "Boys & Girls",
        verified: false,
        rating: 4.2,
        reviews: 67,
        location: "Goregaon East",
        area: "Near Mall",
        distance: "1.5km from Goregaon Station",
        price: 7000,
        deposit: 14000,
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
        amenities: ["WiFi", "Laundry"],
        available: 8
      },
      {
        id: 5,
        name: "Premium Heights",
        type: "Premium PG",
        gender: "Boys",
        verified: true,
        rating: 4.7,
        reviews: 134,
        location: "Malad West",
        area: "Near IT Park",
        distance: "600m from Malad Metro",
        price: 13000,
        deposit: 26000,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "Parking", "Power Backup", "CCTV"],
        available: 5
      },
      {
        id: 6,
        name: "Cozy Corner PG",
        type: "Standard PG",
        gender: "Girls",
        verified: true,
        rating: 4.6,
        reviews: 98,
        location: "Versova",
        area: "Near Beach",
        distance: "300m from Versova Metro",
        price: 11000,
        deposit: 22000,
        image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Housekeeping"],
        available: 7
      }
    ];

    this.filteredProperties = [...this.properties];
    this.loading = false;
  }

  applyFilters(): void {
    let filtered = [...this.properties];

    // Search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.area.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (this.selectedGender) {
      filtered = filtered.filter(p => 
        p.gender === this.selectedGender || p.gender === 'Boys & Girls'
      );
    }

    // Type filter
    if (this.selectedType) {
      filtered = filtered.filter(p => p.type === this.selectedType);
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= this.minPrice && p.price <= this.maxPrice
    );

    // Amenities filter
    if (this.selectedAmenities.length > 0) {
      filtered = filtered.filter(p =>
        this.selectedAmenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Sorting
    filtered = this.sortProperties(filtered);

    this.filteredProperties = filtered;
  }

  sortProperties(properties: Property[]): Property[] {
    switch (this.sortBy) {
      case 'price-low':
        return properties.sort((a, b) => a.price - b.price);
      case 'price-high':
        return properties.sort((a, b) => b.price - a.price);
      case 'rating':
        return properties.sort((a, b) => b.rating - a.rating);
      case 'popularity':
        return properties.sort((a, b) => b.reviews - a.reviews);
      default:
        return properties;
    }
  }

  toggleAmenity(amenity: string): void {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index > -1) {
      this.selectedAmenities.splice(index, 1);
    } else {
      this.selectedAmenities.push(amenity);
    }
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedGender = '';
    this.selectedType = '';
    this.minPrice = 0;
    this.maxPrice = 50000;
    this.selectedAmenities = [];
    this.sortBy = 'relevance';
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }
}