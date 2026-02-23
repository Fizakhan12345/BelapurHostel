// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

  newsletterEmail = '';
  subscribed = false;
  currentYear = new Date().getFullYear();

  quickLinks = [
    { name: 'Home',          route: '/' },
    { name: 'Our Services',  route: '/services' },
    { name: 'Properties',    route: '/properties' },
    { name: 'About Us',      route: '/about' },
    { name: 'Contact Us',    route: '/contact' },
    { name: 'Register',      route: '/register' },
  ];

  propertyTypes = [
    { name: 'Boys Hostel',       route: '/properties/boys-hostel' },
    { name: 'Girls Hostel',      route: '/properties/girls-hostel' },
    { name: 'Co-ed Hostel',      route: '/properties/co-ed' },
    { name: 'PG Accommodation',  route: '/properties/pg' },
    { name: 'Co-living Spaces',  route: '/properties/co-living' },
    { name: 'Studio Apartments', route: '/properties/studio' },
  ];

  policies = [
    { name: 'Privacy Policy',    route: '/privacy' },
    { name: 'Terms of Service',  route: '/terms' },
    { name: 'Refund Policy',     route: '/refund' },
    { name: 'Cookie Policy',     route: '/cookies' },
    { name: 'Safety Guidelines', route: '/safety' },
  ];

  support = [
    { name: 'Help Centre',       route: '/help' },
    { name: 'FAQs',              route: '/faq' },
    { name: 'Report an Issue',   route: '/report' },
    { name: 'Careers',           route: '/careers' },
    { name: 'Blog',              route: '/blog' },
  ];

  trustBadges = [
    { icon: '✓',  strong: '100% Verified',  label: 'Properties' },
    { icon: '🔒', strong: 'Secure',          label: 'Payments' },
    { icon: '💰', strong: 'Zero',            label: 'Brokerage' },
    { icon: '⭐', strong: '5,000+',          label: 'Happy Tenants' },
    { icon: '🏅', strong: 'ISO Certified',   label: 'Platform' },
    { icon: '📞', strong: '24×7',            label: 'Support' },
  ];

  ngOnInit(): void {}

  subscribeNewsletter(): void {
    if (this.newsletterEmail && !this.subscribed) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      this.subscribed = true;
      // Reset after 5 seconds for demo
      setTimeout(() => {
        this.subscribed = false;
        this.newsletterEmail = '';
      }, 5000);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}