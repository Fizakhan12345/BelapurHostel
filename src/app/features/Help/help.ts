// help.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: string;
  link?: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './help.html',
  styleUrls: ['./help.css']
})
export class HelpComponent implements OnInit {

  searchQuery = '';
  searchFocused = false;
  searchResults: FaqItem[] = [];
  activeCategory = 'all';
  openFaqId: number | null = null;
  showToast = false;
  toastMsg = '';
  toastIcon = '✓';

  get activeCategoryLabel(): string {
    return this.helpCategories.find(c => c.key === this.activeCategory)?.title || '';
  }

  popularTags = ['Booking', 'Refund', 'Check-in', 'Security Deposit', 'Wi-Fi', 'Cancellation'];

  stats = [
    { icon: '📚', value: '120+', label: 'Help Articles' },
    { icon: '⚡', value: '<2 min', label: 'Avg Response' },
    { icon: '😊', value: '98%', label: 'Satisfaction Rate' },
    { icon: '🕐', value: '24×7', label: 'Support Hours' },
  ];

  helpCategories = [
    {
      key: 'all',
      title: 'All Topics',
      description: 'Browse everything in our help centre',
      icon: '◈',
      count: 42,
      gradient: 'linear-gradient(135deg,#667eea,#764ba2)'
    },
    {
      key: 'booking',
      title: 'Booking',
      description: 'How to search, reserve and confirm your stay',
      icon: '🏨',
      count: 12,
      gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)'
    },
    {
      key: 'payment',
      title: 'Payments',
      description: 'Payment methods, receipts and billing queries',
      icon: '💳',
      count: 9,
      gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)'
    },
    {
      key: 'cancellation',
      title: 'Cancellations',
      description: 'Cancel or modify your booking easily',
      icon: '🔄',
      count: 8,
      gradient: 'linear-gradient(135deg,#fa709a,#fee140)'
    },
    {
      key: 'property',
      title: 'Properties',
      description: 'Amenities, rules and property details',
      icon: '🏠',
      count: 7,
      gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)'
    },
    {
      key: 'account',
      title: 'My Account',
      description: 'Profile, passwords, and settings',
      icon: '👤',
      count: 6,
      gradient: 'linear-gradient(135deg,#fd7979,#fda085)'
    },
  ];

  faqs: FaqItem[] = [
    {
      id: 1, category: 'booking', icon: '🔍',
      question: 'How do I search and book a hostel on HostelBook?',
      answer: 'Simply enter your desired location in the search bar on the home page. Filter by price, room type, amenities, and availability. Click on any property to view details, photos, and reviews. Once ready, click "Book Now", choose your move-in date, and complete the secure payment. You will receive a confirmation email instantly.',
      link: '/properties'
    },
    {
      id: 2, category: 'booking', icon: '📅',
      question: 'Can I book for a specific move-in date?',
      answer: 'Yes! During the booking process, you can select your preferred move-in date using the calendar picker. Most properties allow bookings 30–90 days in advance. If your date is not available, you can join the waitlist and we will notify you as soon as a slot opens up.',
    },
    {
      id: 3, category: 'booking', icon: '📋',
      question: 'What documents are required for check-in?',
      answer: 'You will need to present a valid government-issued photo ID (Aadhaar Card, Passport, or Driving License), your booking confirmation email or PDF, and the security deposit (if not paid online). Some properties may also require a recent passport-sized photograph.'
    },
    {
      id: 4, category: 'payment', icon: '💰',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Debit & Credit Cards (Visa, MasterCard, RuPay), Net Banking from 50+ banks, and EMI options for longer stays. All transactions are secured with 256-bit SSL encryption.',
    },
    {
      id: 5, category: 'payment', icon: '🔐',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. HostelBook uses industry-standard 256-bit SSL encryption for all transactions. We are PCI-DSS compliant and never store your card details on our servers. All payments are processed through RBI-approved payment gateways.',
    },
    {
      id: 6, category: 'payment', icon: '🧾',
      question: 'How do I get a payment receipt or invoice?',
      answer: 'A detailed receipt is automatically emailed to your registered address after every successful payment. You can also download invoices anytime from My Account → Bookings → Download Invoice. For GST invoices, please update your GST number in your profile settings before booking.',
    },
    {
      id: 7, category: 'cancellation', icon: '❌',
      question: 'What is the cancellation policy?',
      answer: 'Our cancellation policy varies by property. Most properties offer a free cancellation window of 48–72 hours before the check-in date. After that, a partial refund (50–75%) may apply. Some properties have a strict no-refund policy which is clearly marked on the listing page before you book.',
      link: '/refund'
    },
    {
      id: 8, category: 'cancellation', icon: '💸',
      question: 'How long does a refund take?',
      answer: 'Refunds are processed within 2–5 business days after cancellation approval. The amount is credited back to the original payment method. UPI refunds are usually instant or within 24 hours. Bank card refunds may take 3–7 business days depending on your bank.',
    },
    {
      id: 9, category: 'cancellation', icon: '🔃',
      question: 'Can I change my move-in or move-out date?',
      answer: 'Yes, you can modify your booking dates from My Account → Bookings → Modify Booking, subject to availability. Date changes within 48 hours of check-in may incur a small rescheduling fee of ₹200–₹500 depending on the property policy.',
    },
    {
      id: 10, category: 'property', icon: '⚡',
      question: 'Are all amenities listed on the page actually available?',
      answer: 'Yes. All amenities shown on property listings are verified by our team through physical inspection. Properties are re-inspected every 6 months. If you find an amenity unavailable at your booked property, please report it immediately through the app and we will resolve it within 24 hours.',
    },
    {
      id: 11, category: 'property', icon: '🔒',
      question: 'How safe are the hostels listed on HostelBook?',
      answer: 'All properties on HostelBook are verified for safety including CCTV coverage, 24×7 security guards, biometric or key-card entry, fire safety equipment, and emergency contact availability. We display a Safety Score on each listing based on our inspection checklist.',
    },
    {
      id: 12, category: 'property', icon: '👥',
      question: 'Are there options for both boys and girls hostels?',
      answer: 'Absolutely. We have separate listings for Boys-only, Girls-only, and Co-ed hostels. You can filter by gender preference on the search page. All girl-specific hostels have additional safety measures including female security staff and restricted male visitor policies.',
    },
    {
      id: 13, category: 'account', icon: '🔑',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link within 2 minutes. The link is valid for 30 minutes. If you do not receive the email, check your spam folder or contact support.',
    },
    {
      id: 14, category: 'account', icon: '✏️',
      question: 'How do I update my profile information?',
      answer: 'Log in and go to My Account → Edit Profile. You can update your name, phone number, profile photo, and preferences. Note that your registered email address cannot be changed for security reasons. If you need to change your email, please contact our support team.',
    },
  ];

  filteredFaqs: FaqItem[] = [];

  contactOptions = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support agents in real-time for instant help.',
      timing: '⚡ Usually responds in under 2 minutes',
      action: 'Start Chat',
      gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
      type: 'chat'
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll reply within a few hours.',
      timing: '📬 Response within 2–4 hours',
      action: 'Send Email',
      gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)',
      type: 'email'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with our support team for urgent issues.',
      timing: '🕐 Available 9 AM – 9 PM daily',
      action: 'Call Now',
      gradient: 'linear-gradient(135deg,#fa709a,#fee140)',
      type: 'call'
    },
    {
      icon: '🟢',
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick, convenient support.',
      timing: '✅ Available 24×7',
      action: 'Message Us',
      gradient: 'linear-gradient(135deg,#25D366,#128C7E)',
      type: 'whatsapp'
    },
  ];

  guideSteps = [
    { icon: '🔍', title: 'Search Your Area', desc: 'Enter a Mumbai locality like Bandra, Andheri or Powai to see available hostels.' },
    { icon: '🏠', title: 'Compare Properties', desc: 'View photos, amenities, reviews and pricing. Use filters to narrow down options.' },
    { icon: '📅', title: 'Choose Your Dates', desc: 'Select your move-in date and preferred room type (single, double, dormitory).' },
    { icon: '💳', title: 'Pay Securely', desc: 'Complete payment via UPI, Card or Net Banking with 256-bit SSL encryption.' },
    { icon: '✅', title: 'Confirmed & Move In', desc: 'Receive instant confirmation and walk in on your selected date. Welcome home!' },
  ];

  ngOnInit(): void {
    this.filteredFaqs = [...this.faqs];
  }

  onSearch(): void {
    if (this.searchQuery.length < 2) {
      this.searchResults = [];
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.searchResults = this.faqs
      .filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
      .slice(0, 5)
      .map(f => ({ ...f, category: this.helpCategories.find(c => c.key === f.category)?.title || '' }));
  }

  quickSearch(tag: string): void {
    this.searchQuery = tag;
    this.onSearch();
  }

  openFaq(faq: FaqItem): void {
    this.searchResults = [];
    this.searchQuery = '';
    const cat = faq.category;
    this.activeCategory = cat;
    this.filteredFaqs = cat === 'all' ? [...this.faqs] : this.faqs.filter(f => f.category === cat);
    this.openFaqId = faq.id;
    setTimeout(() => {
      document.getElementById('faq-' + faq.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  selectCategory(key: string): void {
    this.activeCategory = key;
    this.filteredFaqs = key === 'all' ? [...this.faqs] : this.faqs.filter(f => f.category === key);
    this.openFaqId = null;
  }

  toggleFaq(id: number): void {
    this.openFaqId = this.openFaqId === id ? null : id;
  }

  markHelpful(id: number, helpful: boolean, event: Event): void {
    event.stopPropagation();
    this.toast(helpful ? '👍 Thanks for the feedback!' : '👎 We\'ll improve this answer!', helpful ? '✓' : '!');
  }

  handleContact(c: any): void {
    const msgs: any = {
      chat:      ['💬 Opening live chat...', '💬'],
      email:     ['📧 Opening email client...', '📧'],
      call:      ['📞 Dialling +91 12345 67890...', '📞'],
      whatsapp:  ['🟢 Opening WhatsApp...', '🟢'],
    };
    const [msg, icon] = msgs[c.type] || ['Opening...', '✓'];
    this.toast(msg, icon);
  }

  private toast(msg: string, icon = '✓'): void {
    this.toastMsg = msg;
    this.toastIcon = icon;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3200);
  }
}