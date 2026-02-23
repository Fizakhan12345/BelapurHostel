// property-details.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-detail.html',
    imports: [CommonModule],
  styleUrl: './property-detail.css',
})
export class PropertyDetail implements OnInit {
  propertyId: string = '';
  currentImageIndex: number = 0;
  showAllAmenities: boolean = false;
  selectedRoom: any = null;
  showBookingModal: boolean = false;
  isFavorite: boolean = false;
  activeTab: string = 'overview';
  showImageGallery: boolean = false;

  property = {
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
    address: "Plot No. 45, Link Road, Andheri West, Mumbai - 400053",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop"
    ],
    description: "Experience luxury living at Sunrise Heights PG, a premium accommodation facility offering modern amenities and comfortable living spaces. Located in the heart of Andheri West, this property is perfect for students and working professionals seeking a safe and well-maintained environment.",
    highlights: [
      "24/7 Security & CCTV",
      "Power Backup Available",
      "Housekeeping Services",
      "Prime Location",
      "Fully Furnished Rooms",
      "Modern Infrastructure"
    ],
    amenities: [
      { icon: "🛏️", name: "Furnished Rooms" },
      { icon: "❄️", name: "Air Conditioning" },
      { icon: "📺", name: "TV in Common Area" },
      { icon: "🍽️", name: "Meals Included" },
      { icon: "💧", name: "Water Purifier" },
      { icon: "🧺", name: "Laundry Service" },
      { icon: "📶", name: "High-Speed WiFi" },
      { icon: "🚗", name: "Parking Available" },
      { icon: "🔒", name: "Secure Lockers" },
      { icon: "🏋️", name: "Gym Access" },
      { icon: "🎮", name: "Recreation Room" },
      { icon: "🧹", name: "Daily Cleaning" }
    ],
    roomTypes: [
      {
        id: 1,
        type: "Single Occupancy",
        price: 15000,
        available: 2,
        features: ["Attached Bathroom", "AC", "Wardrobe", "Study Table"]
      },
      {
        id: 2,
        type: "Double Sharing",
        price: 12000,
        available: 4,
        features: ["Common Bathroom", "AC", "Wardrobe", "Study Table"]
      },
      {
        id: 3,
        type: "Triple Sharing",
        price: 9000,
        available: 6,
        features: ["Common Bathroom", "Fan", "Wardrobe", "Study Table"]
      }
    ],
    rules: [
      "No smoking inside the premises",
      "Visitors allowed between 9 AM - 9 PM",
      "Maintain cleanliness in common areas",
      "No loud music after 10 PM",
      "Monthly rent to be paid by 5th of every month"
    ],
    nearbyPlaces: [
      { name: "Andheri Metro Station", distance: "500m", type: "Transit" },
      { name: "Infiniti Mall", distance: "1.2km", type: "Shopping" },
      { name: "Cooper Hospital", distance: "2km", type: "Healthcare" },
      { name: "Mithibai College", distance: "1.5km", type: "Education" },
      { name: "McDonald's", distance: "300m", type: "Food" }
    ],
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@sunriseheights.com",
      responseTime: "Usually responds in 2 hours"
    }
  };

  reviews = [
    {
      name: "Priya Sharma",
      avatar: "PS",
      rating: 5,
      date: "2 weeks ago",
      review: "Amazing place to stay! The rooms are spacious and clean. The owner is very cooperative and the location is perfect for working professionals."
    },
    {
      name: "Amit Patel",
      avatar: "AP",
      rating: 4,
      date: "1 month ago",
      review: "Good PG with all basic amenities. Food quality is excellent and the staff is friendly. Would recommend to anyone looking in Andheri area."
    },
    {
      name: "Sneha Reddy",
      avatar: "SR",
      rating: 5,
      date: "2 months ago",
      review: "Best PG I've stayed in Mumbai! Safe environment for girls, well-maintained property, and great connectivity to office areas."
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.property.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.property.images.length) % this.property.images.length;
  }

  setImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  shareProperty(): void {
    if (navigator.share) {
      navigator.share({
        title: this.property.name,
        text: `Check out ${this.property.name} in ${this.property.location}`,
        url: window.location.href
      });
    }
  }

  selectRoom(room: any): void {
    this.selectedRoom = room;
  }

  openBookingModal(room?: any): void {
    if (room) {
      this.selectedRoom = room;
    }
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
  }

  scheduleVisit(): void {
    alert('Visit scheduling feature coming soon!');
  }

  contactOwner(): void {
    alert('Opening contact options...');
  }

  submitBooking(): void {
    alert('Booking request submitted successfully!');
    this.closeBookingModal();
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  openImageGallery(index: number): void {
    this.currentImageIndex = index;
    this.showImageGallery = true;
  }

  closeImageGallery(): void {
    this.showImageGallery = false;
  }
}