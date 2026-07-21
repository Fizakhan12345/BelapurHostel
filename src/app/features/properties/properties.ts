// properties.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Property {
  id: number;
  name: string;
  type: string;
  category: string;
  location: string;
  city: string;
  distance: string;
  price: number;
  originalPrice?: number;
  area: number; // in sq ft
  bedrooms: number;
  bathrooms: number;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  amenities: string[];
  available: string;
  furnishing: string;
  description: string;
  postedDate: string;
  gender?: string;
  ownerName: string;
  ownerImage: string;
  tags: string[];
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

interface Toast {
  id: number;
  message: string;
}

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties implements OnInit {
  properties: Property[] = [];
  wishlistIds = new Set<number>();
  toasts: Toast[] = [];
  private toastCounter = 0;
  whatsappNumber = '911234567890'; // TODO: replace with your real WhatsApp business number

  get whatsappLink(): string {
    const message = "Hi! I found your listings on HostelKhojo and would like to know more.";
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  // Toolbar state
  searchQuery = '';
  selectedCategory = 'All';
  sortBy: SortOption = 'featured';

  categories: string[] = ['All', 'Luxury', 'Premium', 'Standard', 'Budget'];

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Listed' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = [
      {
        id: 1,
        name: "Luxury Sky Villa",
        type: "Apartment",
        category: "Premium",
        location: "Bandra West, Carter Road",
        city: "Mumbai",
        distance: "2.5 km from Bandra Station",
        price: 85000,
        originalPrice: 95000,
        area: 1850,
        bedrooms: 3,
        bathrooms: 2,
        verified: true,
        featured: true,
        rating: 4.9,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Power Backup", "Lift"],
        available: "Immediate",
        furnishing: "Fully Furnished",
        description: "Stunning sea-facing apartment with modern amenities and breathtaking views of the Arabian Sea.",
        postedDate: "2 days ago",
        gender: "Family",
        ownerName: "Rajesh Sharma",
        ownerImage: "https://i.pravatar.cc/150?img=12",
        tags: ["Sea View", "Pet Friendly", "Modular Kitchen"]
      },
      {
        id: 2,
        name: "Urban Nest Studio",
        type: "Studio",
        category: "Budget",
        location: "Andheri East, Chakala",
        city: "Mumbai",
        distance: "800m from Metro Station",
        price: 22000,
        area: 450,
        bedrooms: 1,
        bathrooms: 1,
        verified: true,
        featured: false,
        rating: 4.5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
        ],
        amenities: ["WiFi", "AC", "Parking", "Water Supply"],
        available: "From 15th March",
        furnishing: "Semi Furnished",
        description: "Compact and efficient studio apartment perfect for young professionals near major IT parks.",
        postedDate: "1 week ago",
        gender: "Boys & Girls",
        ownerName: "Priya Mehta",
        ownerImage: "https://i.pravatar.cc/150?img=5",
        tags: ["Near Metro", "IT Park"]
      },
      {
        id: 3,
        name: "Heritage Residence",
        type: "Villa",
        category: "Luxury",
        location: "Juhu, Gulmohar Road",
        city: "Mumbai",
        distance: "1.2 km from Juhu Beach",
        price: 250000,
        area: 3500,
        bedrooms: 5,
        bathrooms: 4,
        verified: true,
        featured: true,
        rating: 5.0,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
        ],
        amenities: ["Private Pool", "Garden", "Home Theatre", "Gym", "Parking", "Security"],
        available: "Immediate",
        furnishing: "Fully Furnished",
        description: "Exquisite heritage villa with modern amenities, private garden, and premium interiors in prime Juhu location.",
        postedDate: "3 days ago",
        gender: "Family",
        ownerName: "Vikram Khanna",
        ownerImage: "https://i.pravatar.cc/150?img=33",
        tags: ["Beach Nearby", "Luxury Living", "Gated Community"]
      },
      {
        id: 4,
        name: "Green Valley Retreat",
        type: "Apartment",
        category: "Standard",
        location: "Powai, Hiranandani Gardens",
        city: "Mumbai",
        distance: "500m from Powai Lake",
        price: 48000,
        originalPrice: 52000,
        area: 1200,
        bedrooms: 2,
        bathrooms: 2,
        verified: true,
        featured: false,
        rating: 4.7,
        reviews: 178,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
        ],
        amenities: ["Gym", "Swimming Pool", "Club House", "Parking", "Garden"],
        available: "1st April",
        furnishing: "Semi Furnished",
        description: "Serene apartment in Hiranandani with lake views and excellent connectivity to major tech hubs.",
        postedDate: "5 days ago",
        gender: "Family",
        ownerName: "Anita Desai",
        ownerImage: "https://i.pravatar.cc/150?img=20",
        tags: ["Lake View", "Jogging Track", "Kids Play Area"]
      },
      {
        id: 5,
        name: "Metro Link Residency",
        type: "PG",
        category: "Budget",
        location: "Goregaon West, Link Road",
        city: "Mumbai",
        distance: "300m from Goregaon Metro",
        price: 15000,
        area: 180,
        bedrooms: 1,
        bathrooms: 1,
        verified: true,
        featured: false,
        rating: 4.3,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
        ],
        amenities: ["WiFi", "Meals", "Laundry", "AC", "Housekeeping"],
        available: "Immediate",
        furnishing: "Fully Furnished",
        description: "Comfortable PG accommodation with homely food and all modern facilities near metro station.",
        postedDate: "4 days ago",
        gender: "Girls",
        ownerName: "Sunita Rao",
        ownerImage: "https://i.pravatar.cc/150?img=9",
        tags: ["Working Women", "Safe", "CCTV"]
      },
      {
        id: 6,
        name: "Seaside Penthouse",
        type: "Penthouse",
        category: "Luxury",
        location: "Worli, Sea Face",
        city: "Mumbai",
        distance: "At Worli Sea Face",
        price: 350000,
        area: 4200,
        bedrooms: 4,
        bathrooms: 5,
        verified: true,
        featured: true,
        rating: 5.0,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
        ],
        amenities: ["Private Terrace", "Jacuzzi", "Smart Home", "Concierge", "Valet Parking"],
        available: "From May",
        furnishing: "Designer Furnished",
        description: "Ultra-luxury penthouse with 360° sea views, private terrace, and world-class amenities.",
        postedDate: "1 day ago",
        gender: "Family",
        ownerName: "Arjun Malhotra",
        ownerImage: "https://i.pravatar.cc/150?img=15",
        tags: ["Panoramic Views", "Smart Home", "Exclusive"]
      },
      {
        id: 7,
        name: "Student Hub Co-Living",
        type: "Co-Living",
        category: "Budget",
        location: "Malad West, Mindspace",
        city: "Mumbai",
        distance: "1 km from Malad Station",
        price: 12000,
        area: 150,
        bedrooms: 1,
        bathrooms: 1,
        verified: true,
        featured: false,
        rating: 4.4,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"
        ],
        amenities: ["WiFi", "Study Room", "Gaming Zone", "Cafeteria", "CCTV"],
        available: "Immediate",
        furnishing: "Fully Furnished",
        description: "Modern co-living space designed for students and young professionals with community amenities.",
        postedDate: "1 week ago",
        gender: "Boys & Girls",
        ownerName: "Karan Singh",
        ownerImage: "https://i.pravatar.cc/150?img=8",
        tags: ["Student Friendly", "Community Events", "Affordable"]
      },
      {
        id: 8,
        name: "Executive Suites",
        type: "Apartment",
        category: "Premium",
        location: "BKC, G Block",
        city: "Mumbai",
        distance: "Walking distance to BKC Metro",
        price: 125000,
        area: 2100,
        bedrooms: 3,
        bathrooms: 3,
        verified: true,
        featured: true,
        rating: 4.8,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop"
        ],
        amenities: ["Concierge", "Gym", "Spa", "Business Center", "Rooftop Pool"],
        available: "15th March",
        furnishing: "Fully Furnished",
        description: "Premium executive apartments in Mumbai's business district with top-tier amenities and services.",
        postedDate: "2 days ago",
        gender: "Family",
        ownerName: "Neha Kapoor",
        ownerImage: "https://i.pravatar.cc/150?img=25",
        tags: ["Business District", "Premium Living", "Corporate"]
      }
    ];
  }

  // ---- Derived stats for header ----
  get verifiedCount(): number {
    return this.properties.filter(p => p.verified).length;
  }

  get featured(): number {
    return this.properties.filter(p => p.featured).length;
  }

  // ---- Filtering + sorting ----
  get filteredProperties(): Property[] {
    const query = this.searchQuery.trim().toLowerCase();

    let result = this.properties.filter(p => {
      const matchesCategory = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    switch (this.sortBy) {
      case 'price-low':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // properties are already ordered newest-first in source data
        break;
      case 'featured':
      default:
        result = result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.sortBy = 'featured';
  }

  countForCategory(category: string): number {
    if (category === 'All') return this.properties.length;
    return this.properties.filter(p => p.category === category).length;
  }

  // ---- Actions ----
  viewPropertyDetails(propertyId: number): void {
    console.log('Viewing property:', propertyId);
    // this.router.navigate(['/property', propertyId]);
  }

  toggleWishlist(event: Event, property: Property): void {
    event.stopPropagation();
    if (this.wishlistIds.has(property.id)) {
      this.wishlistIds.delete(property.id);
      this.showToast(`Removed "${property.name}" from your wishlist`);
    } else {
      this.wishlistIds.add(property.id);
      this.showToast(`Added "${property.name}" to your wishlist`);
    }
  }

  isWishlisted(propertyId: number): boolean {
    return this.wishlistIds.has(propertyId);
  }

  contactOwner(event: Event, property: Property): void {
    event.stopPropagation();
    this.showToast(`Contacting ${property.ownerName} about "${property.name}"…`);
    // Hook up to your real contact flow here, e.g.:
    // this.router.navigate(['/contact-owner', property.id]);
  }

  scheduleVisit(event: Event, property: Property): void {
    event.stopPropagation();
    this.showToast(`Visit request sent for "${property.name}". The owner will confirm shortly.`);
    // Hook up to your real scheduling flow here, e.g.:
    // this.router.navigate(['/schedule-visit', property.id]);
  }

  // ---- Toast helper ----
  showToast(message: string): void {
    const id = ++this.toastCounter;
    this.toasts.push({ id, message });
    setTimeout(() => this.dismissToast(id), 3200);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getDiscountPercent(property: Property): number {
    if (!property.originalPrice) return 0;
    return Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100);
  }

  trackByPropertyId(index: number, property: Property): number {
    return property.id;
  }
}