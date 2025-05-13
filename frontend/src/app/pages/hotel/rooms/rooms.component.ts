import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { RoomService } from '../../../services/rooms.service';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Hotel {
  id: string;
  photo: string;
  name: string;
  location: string;
  lower_price: number;
  higher_price: number;
  rating: number;
}

interface Room {
  id: string;
  hotel: string;
  capacity: number;
  price: number;
  isOccupied: boolean;
}

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatIconModule, ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hotel!: Hotel;
  rooms: Room[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.parent?.snapshot.paramMap.get('id');
    
    if (!hotelId) {
      this.error = 'ID de hotel no válido';
      this.loading = false;
      return;
    }

    this.hotelService.findHotelById(hotelId).pipe(
      switchMap(hotel => {
        this.hotel = hotel;
        return this.roomService.filterRoomsbyHotel({ 
          hotel: hotelId,  
        });
      })
    ).subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Error cargando las habitaciones';
        this.loading = false;
      }
    });
  }
}