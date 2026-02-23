import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      gradient: 'linear-gradient(135deg, #c9a96e 0%, #a0763e 100%)',
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
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
      gradient: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)',
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
      gradient: 'linear-gradient(135deg, #7b2d8b 0%, #4a1060 100%)',
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
      gradient: 'linear-gradient(135deg, #c0392b 0%, #7b241c 100%)',
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
      gradient: 'linear-gradient(135deg, #5f7a8a 0%, #34495e 100%)',
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
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
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
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
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
      gradient: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
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

  // ===== HOSTEL ESSENTIAL SERVICES =====
  essentialHighlights = [
    {
      icon: '⚡',
      title: 'Electricity 24×7',
      description: 'Uninterrupted power supply with inverter backup and generator support. Zero downtime guaranteed even during grid failures.',
      gradient: 'linear-gradient(135deg, #f5a623 0%, #e67e22 100%)',
      badge: '24×7',
      available: true,
      tags: ['Power Backup', 'Inverter', 'Generator', 'Zero Downtime']
    },
    {
      icon: '🍽️',
      title: 'Food & Dining',
      description: 'Hygienic, nutritious meals served three times daily. Vegetarian, non-vegetarian, and special diet options available on request.',
      gradient: 'linear-gradient(135deg, #c0392b 0%, #922b21 100%)',
      badge: '3 Meals/Day',
      available: true,
      tags: ['Breakfast', 'Lunch', 'Dinner', 'Veg & Non-Veg']
    },
    {
      icon: '🔒',
      title: 'Security 24×7',
      description: 'Round-the-clock security with CCTV surveillance, trained guards, biometric entry, and visitor management system.',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      badge: 'Always On',
      available: true,
      tags: ['CCTV', 'Guards', 'Biometric', 'Visitor Log']
    },
    {
      icon: '💧',
      title: 'Water 24×7',
      description: 'Pure drinking water and continuous hot/cold water supply throughout all floors, powered by overhead tanks and RO systems.',
      gradient: 'linear-gradient(135deg, #0077b6 0%, #023e8a 100%)',
      badge: '24×7',
      available: true,
      tags: ['RO Drinking Water', 'Hot Water', 'Cold Water', 'All Floors']
    },
  ];

  amenityTiles = [
    { icon: '🧹', name: 'Cleanliness', timing: 'Daily', color: '#2d6a4f' },
    { icon: '🦠', name: 'Hygiene', timing: 'Sanitized Daily', color: '#1abc9c' },
    { icon: '📶', name: 'Wi-Fi', timing: '24×7 High Speed', color: '#3498db' },
    { icon: '🚗', name: 'Parking', timing: 'Available', color: '#7f8c8d' },
    { icon: '🧺', name: 'Laundry', timing: 'Twice a Week', color: '#9b59b6' },
    { icon: '🌡️', name: 'AC / Heating', timing: 'All Rooms', color: '#e74c3c' },
    { icon: '🔑', name: 'Locker Storage', timing: 'Secure 24×7', color: '#f39c12' },
    { icon: '📺', name: 'Common TV', timing: 'Lounge Area', color: '#2c3e50' },
    { icon: '🚿', name: 'Hot Shower', timing: '5 AM – 11 PM', color: '#c9a96e' },
    { icon: '🏋️', name: 'Gym Access', timing: '6 AM – 10 PM', color: '#e67e22' },
    { icon: '🧘', name: 'Study Room', timing: '24×7 Quiet Zone', color: '#16a085' },
    { icon: '🚑', name: 'First Aid', timing: 'Always Available', color: '#c0392b' },
  ];

  availabilityBadges = [
    { icon: '✅', label: 'Verified Services' },
    { icon: '🕐', label: '24×7 Support' },
    { icon: '📞', label: 'Helpdesk Available' },
    { icon: '🏅', label: 'ISO Certified' },
  ];

  onAmenityClick(am: any): void {
    this.showToastMessage(`ℹ️ ${am.name}: ${am.timing}`);
  }

  projects: Project[] = [
    {
      title: 'The Grand Maharaja Palace',
      description: 'Complete digital transformation of a 350-room heritage property, implementing our full HMS suite to modernize operations while preserving cultural authenticity.',
      type: 'Full Implementation',
      year: '2024',
      gradient: 'linear-gradient(135deg, #c9a96e 0%, #7b241c 60%, #1a1a2e 100%)',
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
      gradient: 'linear-gradient(135deg, #0077b6 0%, #023e8a 100%)',
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
      gradient: 'linear-gradient(135deg, #7b2d8b 0%, #2c3e50 100%)',
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

  ngOnInit(): void {
    this.filteredServices = [...this.services];
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