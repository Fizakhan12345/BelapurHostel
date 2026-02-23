import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact{
  isChatOpen = false;
  messageInput = '';
  whatsappNumber = '919876543210'; // Replace with your WhatsApp number
  
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = false;
  }

  sendMessage() {
    const message = this.messageInput.trim();
    if (message) {
      const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      this.messageInput = '';
    }
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  makeCall() {
    window.location.href = 'tel:+919876543210';
  }

  sendEmail() {
    window.location.href = 'mailto:contact@bedrindia.com';
  }
}