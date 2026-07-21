import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  loading: boolean = false;
  successMsg: string = '';

  // Left-panel perks, rendered with *ngFor in login.html
  perks = [
    {
      icon: '✅',
      title: 'Verified Listings',
      desc: 'Every hostel and PG is checked before it goes live.'
    },
    {
      icon: '💬',
      title: 'Direct Messaging',
      desc: 'Talk to owners directly — no brokers, no markup.'
    },
    {
      icon: '⭐',
      title: 'Real Reviews',
      desc: 'Ratings from tenants who actually stayed there.'
    }
  ];

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      console.warn('Please fill in all fields.');
      return;
    }

    this.loading = true;

    console.log('Login attempt:', { email: this.email, password: this.password });

    // 🔌 Replace with real API call: this.authService.login({ email, password, rememberMe })
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Login successful! Redirecting...';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }, 1200);
  }
}