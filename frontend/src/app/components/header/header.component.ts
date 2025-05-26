import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true, 
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class HeaderComponent {
  appName = "Cowtel";
  selectedLanguage = "ES";
  selectedCurrency = "COP";
  languages = ["ES", "EN", "FR"];
  currencies = ["COP", "USD", "EUR"];

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToReserve() {
    this.router.navigate(['/hotel/1/reserves']);
  }
  navigateToAdminHotel() {
    this.router.navigate(['/adminHotel']);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    // Lógica adicional (ej: actualizar traducciones)
  }

  changeCurrency(curr: string) {
    this.selectedCurrency = curr;
    // Lógica adicional (ej: actualizar precios)
  }
}
