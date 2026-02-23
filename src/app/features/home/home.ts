import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  name: string;
  location: string;
  area: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  type: string;
  gender: string;
  amenities: string[];
  distance?: string;
  verified: boolean;
}

interface Testimonial {
  name: string;
  property: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  searchLocation: string = '';
  selectedGender: string = 'all';
  selectedPropertyType: string = 'all';

  // Mumbai Areas for quick search
  popularLocations = [
    { name: 'Bandra', count: 45 },
    { name: 'Andheri', count: 67 },
    { name: 'Powai', count: 38 },
    { name: 'Churchgate', count: 29 },
    { name: 'Dadar', count: 42 },
    { name: 'Navi Mumbai', count: 55 },
    { name: 'Thane', count: 48 },
    { name: 'Malad', count: 35 }
  ];

  // Featured Properties - Demo Data
  featuredProperties: Property[] = [
    {
      id: 1,
      name: 'The Urban Nest',
      location: 'Bandra West',
      area: 'Near Bandra Station',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
      rating: 4.5,
      reviews: 128,
      type: 'PG',
      gender: 'Girls',
      amenities: ['WiFi', 'AC', 'Meals', 'Laundry'],
      distance: '500m from station',
      verified: true
    },
    {
      id: 2,
      name: 'Skyline Hostel',
      location: 'Andheri East',
      area: 'Near Metro Station',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      rating: 4.3,
      reviews: 95,
      type: 'Hostel',
      gender: 'Boys',
      amenities: ['WiFi', 'Gym', 'Parking', 'Security'],
      distance: '200m from metro',
      verified: true
    },
    {
      id: 3,
      name: 'Comfort Stay',
      location: 'Powai',
      area: 'Hiranandani Area',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      rating: 4.7,
      reviews: 156,
      type: 'Co-Living',
      gender: 'Unisex',
      amenities: ['WiFi', 'AC', 'Housekeeping', 'Lounge'],
      distance: '1km from Powai Lake',
      verified: true
    },
    {
      id: 4,
      name: 'Marine Drive Residency',
      location: 'Churchgate',
      area: 'Marine Drive',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      rating: 4.8,
      reviews: 203,
      type: 'PG',
      gender: 'Girls',
      amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry'],
      distance: '5 min walk to Marine Drive',
      verified: true
    },
    {
      id: 5,
      name: 'Green Valley Stay',
      location: 'Navi Mumbai',
      area: 'Vashi',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&h=600&fit=crop',
      rating: 4.2,
      reviews: 87,
      type: 'Hostel',
      gender: 'Boys',
      amenities: ['WiFi', 'Parking', 'Common Kitchen', 'Terrace'],
      distance: '10 min from Vashi station',
      verified: true
    },
    {
      id: 6,
      name: 'Elite Coliving',
      location: 'Malad West',
      area: 'Near Infinity Mall',
      price: 13500,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      rating: 4.6,
      reviews: 142,
      type: 'Co-Living',
      gender: 'Unisex',
      amenities: ['WiFi', 'AC', 'Gym', 'Cafeteria', 'Pool Table'],
      distance: 'Near Mall and Metro',
      verified: true
    }
  ];

  // Testimonials
  testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      property: 'The Urban Nest',
      location: 'Bandra West',
      rating: 5,
      review: 'Wonderful PG with a friendly atmosphere! The rooms are well-maintained and housekeeping is regular. Love that it\'s close to malls and restaurants. Felt safe and comfortable throughout my stay.',
      avatar: 'PS'
    },
    {
      name: 'Rahul Mehta',
      property: 'Skyline Hostel',
      location: 'Andheri East',
      rating: 4,
      review: 'Great hostel for bachelors! The owner is very cooperative and the rent is reasonable. Good amenities including WiFi and attached bathroom. Close to metro which makes daily commute easy.',
      avatar: 'RM'
    },
    {
      name: 'Sneha Desai',
      property: 'Comfort Stay',
      location: 'Powai',
      rating: 5,
      review: 'Perfect place for working professionals! The facilities are excellent, rooms are clean, and the environment is peaceful. Great location with easy access to offices and malls.',
      avatar: 'SD'
    },
    {
      name: 'Amit Patel',
      property: 'Green Valley Stay',
      location: 'Navi Mumbai',
      rating: 4,
      review: 'Had a pleasant stay! The staff is attentive and the services are prompt. Common areas are clean and well-lit. It\'s a peaceful environment ideal for studying and relaxing after work.',
      avatar: 'AP'
    }
  ];

  // Why choose us features
  features = [
    {
      icon: '✓',
      title: 'Verified Listings',
      description: 'All properties are physically verified by our team for quality, safety, and cleanliness with authentic photos.',
      color: '#10b981'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Our encrypted payment gateway ensures 100% secure bookings with payment protection and digital agreements.',
      color: '#3b82f6'
    },
    {
      icon: '💰',
      title: 'Zero Brokerage',
      description: 'Connect directly with property owners. Pay only a small 20% fee on first month\'s rent. No hidden charges.',
      color: '#f59e0b'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Get round-the-clock assistance for any issues or questions from our dedicated support team.',
      color: '#8b5cf6'
    },
    {
      icon: '🏠',
      title: 'Wide Selection',
      description: 'Choose from 500+ verified properties across Mumbai including PGs, Hostels, and Co-living spaces.',
      color: '#ec4899'
    },
    {
      icon: '⚡',
      title: 'Quick Booking',
      description: 'Book your perfect accommodation in minutes with our seamless and hassle-free booking process.',
      color: '#06b6d4'
    }
  ];

  stats = [
    { value: '5000+', label: 'Happy Tenants' },
    { value: '500+', label: 'Verified Properties' },
    { value: '50+', label: 'Mumbai Locations' },
    { value: '4.8', label: 'Average Rating' }
  ];

  currentTestimonialIndex = 0;

  ngOnInit() {
    this.startTestimonialCarousel();
  }

  startTestimonialCarousel() {
    setInterval(() => {
      this.currentTestimonialIndex = 
        (this.currentTestimonialIndex + 1) % this.testimonials.length;
    }, 5000);
  }

  onSearch() {
    console.log('Searching for:', this.searchLocation);
    // Navigate to properties page with filters
  }

  searchByLocation(location: string) {
    this.searchLocation = location;
    this.onSearch();
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }
}