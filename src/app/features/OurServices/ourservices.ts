import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesService, Amenity } from '../../core/services/amenties';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  badge?: string;
  category: string;
  categoryLabel: string;
  features: string[];
  availability: string;
  rating: string;
  modalStats: { value: string; label: string }[];
}

export interface Project {
  title: string;
  description: string;
  type: string;
  year: string;
  gradient: string;
  tags: string[];
  results: { value: string; label: string }[];
}

export interface PricingPlan {
  name: string;
  tagline: string;
  icon: string;
  monthlyPrice: number;
  annualPrice: number;
  popular: boolean;
  cta: string;
  features: { name: string; included: boolean }[];
}

// What the template actually renders in the amenities grid
export interface AmenityTile {
  icon: string;
  name: string;
  timing: string;
  color: string;
}

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ourservices.html',
  styleUrls: ['./ourservices.css']
})
export class OurServicesComponent implements OnInit {

  activeCategory = 'all';
  hoveredCard: number | null = null;
  selectedService: Service | null = null;
  isAnnual = false;
  showToast = false;
  toastMessage = '';

  stats = [
    { value: '500+', label: 'Hotels Served' },
    { value: '98%', label: 'Uptime SLA' },
    { value: '2M+', label: 'Guests Managed' },
    { value: '40%', label: 'Revenue Increase' },
  ];

  categories = [
    { key: 'all', label: 'All Services', icon: '◈' },
    { key: 'operations', label: 'Operations', icon: '⚙' },
    { key: 'guest', label: 'Guest Experience', icon: '♛' },
    { key: 'analytics', label: 'Analytics', icon: '◎' },
    { key: 'revenue', label: 'Revenue', icon: '◆' },
  ];

  services: Service[] = [
    {
      id: 1,
      title: 'Reservation Management',
      description: 'Streamline bookings across all channels with intelligent conflict detection and real-time availability updates.',
      icon: '🏨',
      gradient: 'linear-gradient(135deg, #f7941d 0%, #dd7c05 100%)',
      badge: 'Core',
      category: 'operations',
      categoryLabel: 'Operations',
      features: [
        'Multi-channel booking synchronization',
        'Automated confirmation emails',
        'Waitlist management',
        'Group reservation handling',
        'OTA channel integration'
      ],
      availability: '24/7 Available',
      rating: '4.9/5',
      modalStats: [
        { value: '99.9%', label: 'Booking Accuracy' },
        { value: '<2s', label: 'Response Time' },
        { value: '50+', label: 'OTA Channels' },
      ]
    },
    {
      id: 2,
      title: 'Front Desk Operations',
      description: 'Empower your front desk team with lightning-fast check-in/check-out, digital key management, and guest profile access.',
      icon: '🛎',
      gradient: 'linear-gradient(135deg, #1b1e4c 0%, #262a63 100%)',
      badge: 'Popular',
      category: 'operations',
      categoryLabel: 'Operations',
      features: [
        'Digital check-in kiosk support',
        'Mobile key issuance',
        'Guest ID verification',
        'Room upgrade automation',
        'Luggage tracking system'
      ],
      availability: '24/7 Available',
      rating: '4.8/5',
      modalStats: [
        { value: '3 min', label: 'Avg Check-in Time' },
        { value: '95%', label: 'Guest Satisfaction' },
        { value: '80%', label: 'Digital Adoption' },
      ]
    },
    {
      id: 3,
      title: 'Housekeeping Management',
      description: 'Automate room assignments, track cleaning progress in real-time, and ensure immaculate standards every time.',
      icon: '🧹',
      gradient: 'linear-gradient(135deg, #2d9cdb 0%, #1b1e4c 100%)',
      category: 'operations',
      categoryLabel: 'Operations',
      features: [
        'Real-time room status tracking',
        'Smart task assignment',
        'Inspection checklists',
        'Maintenance request routing',
        'Staff performance metrics'
      ],
      availability: 'Business Hours',
      rating: '4.7/5',
      modalStats: [
        { value: '30%', label: 'Faster Turnover' },
        { value: '0', label: 'Missed Rooms' },
        { value: '100%', label: 'Compliance Rate' },
      ]
    },
    {
      id: 4,
      title: 'Guest Experience Platform',
      description: 'Create personalized experiences from pre-arrival to post-stay with AI-driven preferences and concierge automation.',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #f7941d 100%)',
      badge: 'AI-Powered',
      category: 'guest',
      categoryLabel: 'Guest Experience',
      features: [
        'AI preference learning',
        'In-app concierge chat',
        'Pre-arrival customization',
        'Loyalty program integration',
        'Post-stay feedback automation'
      ],
      availability: '24/7 Available',
      rating: '4.9/5',
      modalStats: [
        { value: '45%', label: 'Repeat Bookings' },
        { value: '4.9★', label: 'Average Review' },
        { value: '200+', label: 'Personalization Rules' },
      ]
    },
    {
      id: 5,
      title: 'Restaurant & Dining POS',
      description: 'Manage in-room dining, restaurant operations, and bar services with a unified point-of-sale and billing system.',
      icon: '🍽',
      gradient: 'linear-gradient(135deg, #eb5757 0%, #a83232 100%)',
      category: 'guest',
      categoryLabel: 'Guest Experience',
      features: [
        'Table management & reservations',
        'Digital menu management',
        'Room charge integration',
        'Kitchen display system',
        'Inventory tracking'
      ],
      availability: 'Business Hours',
      rating: '4.8/5',
      modalStats: [
        { value: '25%', label: 'F&B Revenue Up' },
        { value: '15 min', label: 'Avg Order Time' },
        { value: '0%', label: 'Billing Errors' },
      ]
    },
    {
      id: 6,
      title: 'Spa & Recreation',
      description: 'Schedule wellness services, manage memberships, and track utilization across your spa, gym, and leisure facilities.',
      icon: '💆',
      gradient: 'linear-gradient(135deg, #56ccf2 0%, #1b1e4c 100%)',
      category: 'guest',
      categoryLabel: 'Guest Experience',
      features: [
        'Online appointment booking',
        'Therapist scheduling',
        'Package & membership sales',
        'Capacity management',
        'Revenue optimization'
      ],
      availability: 'Business Hours',
      rating: '4.6/5',
      modalStats: [
        { value: '60%', label: 'Occupancy Rate' },
        { value: '35%', label: 'Revenue Increase' },
        { value: '1000+', label: 'Appointments/Month' },
      ]
    },
    {
      id: 7,
      title: 'Revenue Management',
      description: 'Maximize RevPAR with dynamic pricing algorithms, demand forecasting, and competitive rate intelligence.',
      icon: '📈',
      gradient: 'linear-gradient(135deg, #f7941d 0%, #ffb54d 100%)',
      badge: 'Smart',
      category: 'revenue',
      categoryLabel: 'Revenue',
      features: [
        'Dynamic pricing engine',
        'Demand forecasting AI',
        'Competitor rate tracking',
        'Yield management tools',
        'Package bundling automation'
      ],
      availability: '24/7 Available',
      rating: '4.9/5',
      modalStats: [
        { value: '40%', label: 'RevPAR Increase' },
        { value: '92%', label: 'Forecast Accuracy' },
        { value: 'Real-time', label: 'Rate Updates' },
      ]
    },
    {
      id: 8,
      title: 'Advanced Analytics',
      description: 'Transform raw data into strategic insights with custom dashboards, KPI tracking, and predictive analytics.',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #1b1e4c 0%, #12132b 100%)',
      badge: 'Enterprise',
      category: 'analytics',
      categoryLabel: 'Analytics',
      features: [
        'Real-time KPI dashboards',
        'Custom report builder',
        'Occupancy trend analysis',
        'Guest segmentation',
        'ROI tracking & reporting'
      ],
      availability: '24/7 Available',
      rating: '4.8/5',
      modalStats: [
        { value: '50+', label: 'Report Templates' },
        { value: 'Live', label: 'Data Refresh' },
        { value: '360°', label: 'Business View' },
      ]
    },
    {
      id: 9,
      title: 'Financial Management',
      description: 'Automate billing, manage accounts, track expenses, and generate audit-ready financial reports with ease.',
      icon: '💳',
      gradient: 'linear-gradient(135deg, #27ae60 0%, #1b1e4c 100%)',
      category: 'revenue',
      categoryLabel: 'Revenue',
      features: [
        'Automated billing & invoicing',
        'Multi-currency support',
        'Tax compliance automation',
        'Expense management',
        'Financial audit trails'
      ],
      availability: '24/7 Available',
      rating: '4.7/5',
      modalStats: [
        { value: '100%', label: 'Billing Accuracy' },
        { value: '30%', label: 'Admin Time Saved' },
        { value: '50+', label: 'Currencies' },
      ]
    },
  ];

  filteredServices: Service[] = [];

  // ===== HOSTEL ESSENTIAL SERVICES (still static — big feature cards) =====
  essentialHighlights = [
    {
      icon: '⚡',
      title: 'Electricity 24×7',
      description: 'Uninterrupted power supply with inverter backup and generator support. Zero downtime guaranteed even during grid failures.',
      gradient: 'linear-gradient(135deg, #f7941d 0%, #dd7c05 100%)',
      badge: '24×7',
      available: true,
      tags: ['Power Backup', 'Inverter', 'Generator', 'Zero Downtime']
    },
    {
      icon: '🍽️',
      title: 'Food & Dining',
      description: 'Hygienic, nutritious meals served three times daily. Vegetarian, non-vegetarian, and special diet options available on request.',
      gradient: 'linear-gradient(135deg, #eb5757 0%, #a83232 100%)',
      badge: '3 Meals/Day',
      available: true,
      tags: ['Breakfast', 'Lunch', 'Dinner', 'Veg & Non-Veg']
    },
    {
      icon: '🔒',
      title: 'Security 24×7',
      description: 'Round-the-clock security with CCTV surveillance, trained guards, biometric entry, and visitor management system.',
      gradient: 'linear-gradient(135deg, #1b1e4c 0%, #12132b 100%)',
      badge: 'Always On',
      available: true,
      tags: ['CCTV', 'Guards', 'Biometric', 'Visitor Log']
    },
    {
      icon: '💧',
      title: 'Water 24×7',
      description: 'Pure drinking water and continuous hot/cold water supply throughout all floors, powered by overhead tanks and RO systems.',
      gradient: 'linear-gradient(135deg, #2d9cdb 0%, #1b1e4c 100%)',
      badge: '24×7',
      available: true,
      tags: ['RO Drinking Water', 'Hot Water', 'Cold Water', 'All Floors']
    },
  ];

  // ===== DYNAMIC AMENITIES (now fetched from the database) =====
  // Kept as a fallback/default so the grid isn't empty while the API call
  // is in flight, or if the request fails.
  amenityTiles: AmenityTile[] = [
    { icon: '🧹', name: 'Cleanliness', timing: 'Daily', color: '#f7941d' },
    { icon: '📶', name: 'Wi-Fi', timing: '24×7 High Speed', color: '#2d9cdb' },
    { icon: '🚗', name: 'Parking', timing: 'Available', color: '#8a8ec2' },
  ];

  amenitiesLoading = true;
  amenitiesError: string | null = null;

  // Fallback icon/color per known amenity name, since the amenities table
  // only stores { id, name, category } — the UI needs an icon + color too.
  private amenityIconMap: Record<string, { icon: string; color: string }> = {
    'WiFi':            { icon: '📶', color: '#2d9cdb' },
    'AC':              { icon: '🌡️', color: '#eb5757' },
    'Geyser':          { icon: '🚿', color: '#2d9cdb' },
    'Laundry':         { icon: '🧺', color: '#9b59b6' },
    'Parking':         { icon: '🚗', color: '#8a8ec2' },
    'CCTV':            { icon: '📹', color: '#1b1e4c' },
    'Security Guard':  { icon: '🔒', color: '#1b1e4c' },
    'Mess / Canteen':  { icon: '🍽️', color: '#eb5757' },
    'TV Lounge':       { icon: '📺', color: '#1b1e4c' },
    'Study Room':      { icon: '🧘', color: '#27ae60' },
    'RO Water':        { icon: '💧', color: '#2d9cdb' },
    'Power Backup':    { icon: '⚡', color: '#f7941d' },
    'Gym':             { icon: '🏋️', color: '#dd7c05' },
    'Housekeeping':    { icon: '🧹', color: '#f7941d' },
  };
  private defaultAmenityIcon = { icon: '✨', color: '#8a8ec2' };

  availabilityBadges = [
    { icon: '✅', label: 'Verified Services' },
    { icon: '🕐', label: '24×7 Support' },
    { icon: '📞', label: 'Helpdesk Available' },
    { icon: '🏅', label: 'ISO Certified' },
  ];

  onAmenityClick(am: AmenityTile): void {
    this.showToastMessage(`ℹ️ ${am.name}: ${am.timing}`);
  }

  projects: Project[] = [
    {
      title: 'The Grand Maharaja Palace',
      description: 'Complete digital transformation of a 350-room heritage property, implementing our full HMS suite to modernize operations while preserving cultural authenticity.',
      type: 'Full Implementation',
      year: '2024',
      gradient: 'linear-gradient(135deg, #f7941d 0%, #1b1e4c 100%)',
      tags: ['Enterprise', 'Heritage', 'Full Suite'],
      results: [
        { value: '+52%', label: 'Revenue Growth' },
        { value: '-40%', label: 'Operational Cost' },
        { value: '4.9★', label: 'Guest Rating' },
        { value: '6 wks', label: 'Implementation' },
      ]
    },
    {
      title: 'Azure Seaside Resort Chain',
      description: 'Multi-property rollout across 12 coastal resorts with centralized analytics and unified guest experience platform.',
      type: 'Multi-Property',
      year: '2023',
      gradient: 'linear-gradient(135deg, #2d9cdb 0%, #12132b 100%)',
      tags: ['Multi-Property', 'Chain', 'Analytics'],
      results: [
        { value: '12', label: 'Properties' },
        { value: '+38%', label: 'Avg RevPAR' },
        { value: '99.8%', label: 'System Uptime' },
      ]
    },
    {
      title: 'Urban Boutique Hotels',
      description: 'Rapid deployment of core HMS features for a growing boutique hotel brand with focus on guest experience personalization.',
      type: 'Boutique',
      year: '2024',
      gradient: 'linear-gradient(135deg, #eb5757 0%, #1b1e4c 100%)',
      tags: ['Boutique', 'Fast Deploy', 'Guest CX'],
      results: [
        { value: '+45%', label: 'Repeat Guests' },
        { value: '3 wks', label: 'Go-Live Time' },
        { value: '4.8★', label: 'App Rating' },
      ]
    },
  ];

  pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      tagline: 'Perfect for small properties',
      icon: '🌱',
      monthlyPrice: 199,
      annualPrice: 159,
      popular: false,
      cta: 'Start Free Trial',
      features: [
        { name: 'Up to 50 rooms', included: true },
        { name: 'Reservation Management', included: true },
        { name: 'Front Desk Operations', included: true },
        { name: 'Basic Reporting', included: true },
        { name: 'Revenue Management', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Multi-property Support', included: false },
        { name: 'Dedicated Support', included: false },
      ]
    },
    {
      name: 'Professional',
      tagline: 'For growing hotel businesses',
      icon: '⭐',
      monthlyPrice: 499,
      annualPrice: 399,
      popular: true,
      cta: 'Get Started Now',
      features: [
        { name: 'Up to 200 rooms', included: true },
        { name: 'All Starter Features', included: true },
        { name: 'Revenue Management AI', included: true },
        { name: 'Guest Experience Platform', included: true },
        { name: 'Restaurant & Dining POS', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Multi-property Support', included: false },
        { name: 'Dedicated Support', included: false },
      ]
    },
    {
      name: 'Enterprise',
      tagline: 'For hotel chains & groups',
      icon: '👑',
      monthlyPrice: 1299,
      annualPrice: 1039,
      popular: false,
      cta: 'Contact Sales',
      features: [
        { name: 'Unlimited Rooms', included: true },
        { name: 'All Professional Features', included: true },
        { name: 'Multi-property Management', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'White-label Option', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'SLA Guarantee (99.9%)', included: true },
        { name: '24/7 Priority Support', included: true },
      ]
    },
  ];

  constructor(private amenitiesService: AmenitiesService) {}

  ngOnInit(): void {
    this.filteredServices = [...this.services];
    this.loadAmenities();
  }

  private loadAmenities(): void {
    this.amenitiesLoading = true;
    this.amenitiesError = null;

    this.amenitiesService.getAmenities().subscribe({
      next: (amenities: Amenity[]) => {
        if (!amenities || !amenities.length) {
          // API responded but the table is empty — keep the static fallback.
          this.amenitiesLoading = false;
          return;
        }
        this.amenityTiles = amenities.map(a => this.toTile(a));
        this.amenitiesLoading = false;
      },
      error: (err) => {
        console.error('Failed to load amenities:', err);
        this.amenitiesError = 'Could not load amenities right now.';
        this.amenitiesLoading = false;
        // amenityTiles keeps its static fallback value so the UI isn't empty
      }
    });
  }

  private toTile(amenity: Amenity): AmenityTile {
    const visual = this.amenityIconMap[amenity.name] || this.defaultAmenityIcon;
    return {
      icon: visual.icon,
      name: amenity.name,
      timing: amenity.category
        ? amenity.category.charAt(0).toUpperCase() + amenity.category.slice(1)
        : 'Available',
      color: visual.color
    };
  }

  filterServices(category: string): void {
    this.activeCategory = category;
    if (category === 'all') {
      this.filteredServices = [...this.services];
    } else {
      this.filteredServices = this.services.filter(s => s.category === category);
    }
  }

  onCardHover(id: number): void {
    this.hoveredCard = id;
  }

  onCardLeave(): void {
    this.hoveredCard = null;
  }

  openService(service: Service): void {
    this.selectedService = service;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedService = null;
    document.body.style.overflow = '';
  }

  toggleBilling(): void {
    this.isAnnual = !this.isAnnual;
  }

  selectPlan(plan: PricingPlan): void {
    this.showToastMessage(`✓ ${plan.name} plan selected! Redirecting...`);
  }

  scheduleDemo(): void {
    this.showToastMessage('🗓 Demo scheduled! Check your email for confirmation.');
  }

  contactUs(): void {
    this.showToastMessage('📧 Our sales team will contact you within 24 hours!');
  }

  getStarted(service: Service): void {
    this.closeModal();
    this.showToastMessage(`🚀 Setting up ${service.title}...`);
  }

  private showToastMessage(msg: string): void {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3500);
  }
}