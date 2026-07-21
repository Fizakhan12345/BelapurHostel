import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeTerms: boolean = false;
  showPassword: boolean = false;

  loading: boolean = false;
  successMsg: string = '';

  // Left-panel perks, rendered with *ngFor in register.html
  perks = [
    {
      icon: '🎉',
      title: 'Free to join',
      desc: 'Create an account in under a minute, no fees.'
    },
    {
      icon: '🔒',
      title: 'Secure bookings',
      desc: 'Your payments and data are always protected.'
    },
    {
      icon: '📍',
      title: 'Save your favorites',
      desc: 'Shortlist hostels and PGs as you browse.'
    }
  ];

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.warn('Passwords do not match');
      return;
    }

    if (!this.agreeTerms) {
      console.warn('Please agree to the Terms and Privacy Policy');
      return;
    }

    this.loading = true;

    console.log('Register attempt:', {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone
    });

    // 🔌 Replace with real API call: this.authService.register({ fullName, email, phone, password })
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Account created! Redirecting...';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }, 1200);
  }
}