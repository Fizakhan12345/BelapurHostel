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
  agreeToTerms: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.agreeToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    console.log('Registration attempt:', {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone
    });

    // Add registration logic here
    this.router.navigate(['/login']);
  }
}