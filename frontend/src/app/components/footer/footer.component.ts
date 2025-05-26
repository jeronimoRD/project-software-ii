import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  socialLinks = [
    { url: '#', icon: 'fab fa-facebook' },
    { url: '#', icon: 'fab fa-twitter' },
    { url: '#', icon: 'fab fa-instagram' },
    { url: '#', icon: 'fab fa-github' }
  ];

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
