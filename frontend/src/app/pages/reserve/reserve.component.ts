import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ReservesService } from '../../services/reserves.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

interface Reserve {
  id: string;
  room: { id: string; price: number; };
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

@Component({
  selector: 'app-reserves',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, 
    MatChipsModule
  ],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReservesComponent implements OnInit {
  reserves: Reserve[] = [];
  loading = true;

  constructor(private reservesService: ReservesService) {}

  ngOnInit() {
    this.reservesService.findReserves().subscribe({
      next: (data) => {
        this.reserves = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar reservas', err);
        this.loading = false;
      }
    });
  }
}
