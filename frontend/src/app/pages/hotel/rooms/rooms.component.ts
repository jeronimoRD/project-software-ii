import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { RoomService } from '../../../services/rooms.service';
import { ReservesService, CreateReserve } from '../../../services/reserves.service';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';  // <-- para ngModel

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
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hotel!: Hotel;
  rooms: Room[] = [];
  loading = true;
  error: string | null = null;

  // Propiedades para las fechas de reserva
  startDate!: string;  // se llenará en formato "YYYY-MM-DD"
  endDate!: string;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservesService: ReservesService,    // <-- inyecta aquí
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
        return this.roomService.filterRoomsbyHotel({ hotel: hotelId });
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

  reserveRoom(roomId: string) {
    const payload: CreateReserve = {
      roomId,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.reservesService.createReserve(payload).subscribe({
      next: res => {
        alert(`Reserva creada con ID ${res.id}`);
        // Opcional: recargar habitaciones para ver disponibilidad
        this.ngOnInit();
      },
      error: err => {
        console.error('Error creando reserva', err);
        alert('No se pudo crear la reserva: ' + err.error?.message || err.statusText);
      }
    });
  }
}
