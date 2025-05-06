import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

interface Hotel {
  id: string;
  photo: string;
  name: string;
  location: string;
  description: string;
  lower_price: number;
  higher_price: number;
  rating: number;
}

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent{
  hotel: Hotel | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {
    this.loadHotel();
  }

  private loadHotel(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.error = 'ID de hotel inválido';
      this.loading = false;
      return;
    }

    this.hotelService.findHotelById(id).subscribe({
      next: (response) => {
        this.hotel = response as Hotel;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando la información del hotel';
        this.loading = false;
        console.error('Error fetching hotel:', err);
      }
    });
  }
}