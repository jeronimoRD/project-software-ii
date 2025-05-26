import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appName = 'Cowtel';

  // Para idioma/moneda
  selectedLanguage = 'ES';
  languages = ['ES', 'EN', 'FR'];
  selectedCurrency = 'COP';
  currencies = ['COP', 'USD', 'EUR'];

  // Contador de solicitudes pendientes
  pendingCount = 0;

  constructor(
    private router: Router,
    private requestsSvc: RequestsService
  ) {}

  ngOnInit() {
    this.loadPendingCount();
  }

  private loadPendingCount() {
    this.requestsSvc.showRequests().subscribe({
      next: requests => {
        // Filtra sólo las que están en estado PENDING
        this.pendingCount = requests.filter((r: any) => r.status === 'PENDING').length;
      },
      error: () => {
        this.pendingCount = 0;
      }
    });
  }

  // Navegación
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToAdminHotel() {
    this.router.navigate(['/adminHotel']);
  }
  navigateToRooms() {
    this.router.navigate(['/adminRooms']);
  }

  navigateToReserves() {
    this.router.navigate(['/reserves']);
  }

  navigateToRequests() {
    this.router.navigate(['/admin/requests']);
  }

  navigateToFavorites() {
    // Si tienes una ruta de favoritos, cámbiala aquí:
    this.router.navigate(['/favorites']);
  }

  // Cambio de idioma/moneda
  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    // Aquí podrías disparar un servicio de traducción
  }

  changeCurrency(curr: string) {
    this.selectedCurrency = curr;
    // Aquí podrías actualizar contexto de precios
  }
}
