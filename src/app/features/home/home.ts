import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
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

interface City {
  name: string;
  count: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {
  searchLocation: string = '';
  selectedGender: string = 'all';
  selectedPropertyType: string = 'all';

  popularCities: City[] = [
    { name: 'Mumbai', count: 145 },
    { name: 'Bengaluru', count: 168 },
    { name: 'Delhi NCR', count: 132 },
    { name: 'Pune', count: 97 },
    { name: 'Hyderabad', count: 84 },
    { name: 'Chennai', count: 76 },
    { name: 'Kolkata', count: 58 },
    { name: 'Ahmedabad', count: 41 }
  ];

  featuredProperties: Property[] = [
    {
      id: 1,
      name: 'The Urban Nest',
      location: 'Bandra West',
      city: 'Mumbai',
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
      name: 'Koramangala Collective',
      location: '5th Block',
      city: 'Bengaluru',
      price: 10500,
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
      name: 'Hinjewadi Comfort Stay',
      location: 'Phase 1',
      city: 'Pune',
      price: 11500,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      rating: 4.7,
      reviews: 156,
      type: 'Co-Living',
      gender: 'Unisex',
      amenities: ['WiFi', 'AC', 'Housekeeping', 'Lounge'],
      distance: '1km from IT Park',
      verified: true
    },
    {
      id: 4,
      name: 'Saket Residency',
      location: 'Saket',
      city: 'Delhi NCR',
      price: 14000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      rating: 4.8,
      reviews: 203,
      type: 'PG',
      gender: 'Girls',
      amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry'],
      distance: '5 min walk to metro',
      verified: true
    },
    {
      id: 5,
      name: 'Gachibowli Green Stay',
      location: 'Gachibowli',
      city: 'Hyderabad',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&h=600&fit=crop',
      rating: 4.2,
      reviews: 87,
      type: 'Hostel',
      gender: 'Boys',
      amenities: ['WiFi', 'Parking', 'Common Kitchen', 'Terrace'],
      distance: '10 min from tech park',
      verified: true
    },
    {
      id: 6,
      name: 'OMR Elite Coliving',
      location: 'Sholinganallur',
      city: 'Chennai',
      price: 10800,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      rating: 4.6,
      reviews: 142,
      type: 'Co-Living',
      gender: 'Unisex',
      amenities: ['WiFi', 'AC', 'Gym', 'Cafeteria', 'Pool Table'],
      distance: 'Near IT corridor',
      verified: true
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      property: 'The Urban Nest',
      location: 'Mumbai',
      rating: 5,
      review: 'Wonderful PG with a friendly atmosphere! The rooms are well-maintained and housekeeping is regular. Felt safe and comfortable throughout my stay.',
      avatar: 'PS'
    },
    {
      name: 'Rahul Mehta',
      property: 'Koramangala Collective',
      location: 'Bengaluru',
      rating: 4,
      review: 'Great hostel for bachelors! The owner is very cooperative and the rent is reasonable. Close to metro which makes daily commute easy.',
      avatar: 'RM'
    },
    {
      name: 'Sneha Desai',
      property: 'Hinjewadi Comfort Stay',
      location: 'Pune',
      rating: 5,
      review: 'Perfect place for working professionals! The facilities are excellent, rooms are clean, and the environment is peaceful.',
      avatar: 'SD'
    },
    {
      name: 'Amit Patel',
      property: 'Gachibowli Green Stay',
      location: 'Hyderabad',
      rating: 4,
      review: 'Had a pleasant stay! The staff is attentive and the services are prompt. A peaceful environment, ideal for studying after work.',
      avatar: 'AP'
    }
  ];

  features = [
    {
      icon: '✓',
      title: 'Verified Listings',
      description: 'Every property is physically verified by our team for quality, safety, and cleanliness, with authentic photos.'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Our encrypted payment gateway ensures 100% secure bookings with payment protection and digital agreements.'
    },
    {
      icon: '₹',
      title: 'Zero Brokerage',
      description: 'Connect directly with property owners. Pay only a small 20% fee on first month\u2019s rent. No hidden charges.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Get round-the-clock assistance for any issues or questions from our dedicated support team.'
    },
    {
      icon: '🏠',
      title: 'Pan-India Selection',
      description: 'Choose from 700+ verified properties across 25+ Indian cities, including PGs, hostels, and co-living spaces.'
    },
    {
      icon: '⚡',
      title: 'Quick Booking',
      description: 'Book your perfect accommodation in minutes with our seamless and hassle-free booking process.'
    }
  ];

  stats = [
    { value: '10,000+', label: 'Happy Tenants' },
    { value: '700+', label: 'Verified Properties' },
    { value: '25+', label: 'Cities Across India' },
    { value: '4.8', label: 'Average Rating' }
  ];

  // Signal instead of a plain number — in a zoneless app, only signal
  // writes (or Angular-native async APIs like HttpClient/RouterEvents)
  // reliably trigger a re-render. A plain property mutated from inside
  // setInterval() is invisible to the zoneless scheduler, so the
  // carousel would silently stop updating the screen even though the
  // value was changing correctly under the hood.
  currentTestimonialIndex = signal(0);

  private carouselTimer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startTestimonialCarousel();
  }

  ngOnDestroy() {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
  }

  startTestimonialCarousel() {
    this.carouselTimer = setInterval(() => {
      const next = (this.currentTestimonialIndex() + 1) % this.testimonials.length;
      this.currentTestimonialIndex.set(next);
    }, 5000);
  }

  goToTestimonial(index: number): void {
    this.currentTestimonialIndex.set(index);
  }

  onSearch() {
    console.log('Searching for:', this.searchLocation);
  }

  searchByLocation(location: string) {
    this.searchLocation = location;
    this.onSearch();
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }
}