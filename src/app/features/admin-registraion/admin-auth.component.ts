// admin-auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
    standalone: true,
  imports: [FormsModule, CommonModule], 
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {

  activeTab: 'login' | 'register' = 'login';
  showPassword = false;
  showRegPassword = false;
  loading = false;
  successMsg = '';

  // ─── Login Form ───────────────────────────────────────
  loginForm = {
    email: '',
    password: '',
    remember: false
  };

  // ─── Register Form ────────────────────────────────────
  registerForm = {
    adminName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    propertyName: '',
    propertyType: '',
    totalRooms: null,
    address: '',
    city: '',
    rent: null,
    agreed: false
  };

  // ─── Static Data ──────────────────────────────────────
  perks = [
    {
      icon: '📋',
      title: 'Free Listing',
      desc: 'No upfront cost to list your PG or hostel'
    },
    {
      icon: '📊',
      title: 'Booking Dashboard',
      desc: 'Track inquiries, bookings & revenue in real time'
    },
    {
      icon: '💬',
      title: 'Tenant Messaging',
      desc: 'Chat directly with interested tenants'
    },
    {
      icon: '⭐',
      title: 'Verified Badge',
      desc: 'Build trust with our verification program'
    }
  ];

  propertyTypes = [
    { value: 'boys-hostel', label: '🧑 Boys Hostel' },
    { value: 'girls-hostel', label: '👩 Girls Hostel' },
    { value: 'co-ed', label: '👥 Co-ed Hostel' },
    { value: 'pg', label: '🏠 PG Accommodation' },
    { value: 'co-living', label: '🤝 Co-living Space' },
    { value: 'studio', label: '🏢 Studio Apartment' }
  ];

  amenities = [
    { label: '🍽 Meals Included', value: 'meals', checked: false },
    { label: '📶 WiFi', value: 'wifi', checked: false },
    { label: '❄ AC Rooms', value: 'ac', checked: false },
    { label: '🧺 Laundry', value: 'laundry', checked: false },
    { label: '🔒 24hr Security', value: 'security', checked: false },
    { label: '🅿 Parking', value: 'parking', checked: false },
    { label: '🏋 Gym', value: 'gym', checked: false },
    { label: '📺 TV Lounge', value: 'tv', checked: false }
  ];

  constructor(private router: Router) {}

  // ─── Login Handler ────────────────────────────────────
  onLogin(): void {
    if (!this.loginForm.email || !this.loginForm.password) {
      alert('Please fill in all fields.');
      return;
    }

    this.loading = true;

    // 🔌 Replace with real API call: this.authService.adminLogin(this.loginForm)
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Login successful! Redirecting to dashboard...';

      setTimeout(() => {
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    }, 1500);
  }

  // ─── Register Handler ─────────────────────────────────
  onRegister(): void {
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.registerForm.agreed) {
      alert('Please agree to the terms and commission policy.');
      return;
    }

    this.loading = true;

    const selectedAmenities = this.amenities
      .filter(a => a.checked)
      .map(a => a.value);

    const payload = {
      ...this.registerForm,
      amenities: selectedAmenities
    };

    console.log('Registration payload:', payload);

    // 🔌 Replace with real API call: this.authService.registerAdmin(payload)
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Property registered! Check your email to activate your account.';

      setTimeout(() => {
        this.activeTab = 'login';
        this.successMsg = '';
      }, 3000);
    }, 2000);
  }
}