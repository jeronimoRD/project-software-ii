import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { RoomService } from '../../services/rooms.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Room {
  id: string;
  capacity: number;      // antes room_number
  type: string;
  price: number;
  isOccupied: boolean; 
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rooms: Room[];         // siempre un array
}

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  hotel: Hotel | null = null;
  addRoomForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private hotelSvc: HotelService,
    private roomSvc: RoomService,
    private hotelService: HotelService
  ) {
    this.addRoomForm = this.fb.group({
      capacity: [1, [Validators.required, Validators.min(1)]],
      type:     ['standard', [Validators.required]],
      price:    [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.hotelSvc.getHotelByAdmin().subscribe({
      next: hotels => {
        // nos aseguramos de que rooms siempre exista
        this.hotel = { ...hotels[0], rooms: hotels[0].rooms || [] };
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'No se pudo cargar el hotel';
      }
    });
  }

  addRoom() {
    if (!this.hotel || this.addRoomForm.invalid) return;
      const dto = {
        hotel:    this.hotel.id,                       
        capacity: this.addRoomForm.value.capacity,
        price:    this.addRoomForm.value.price,
        type:     this.addRoomForm.value.type,    
      };

      this.roomSvc.createRoom(dto).subscribe({
        next: (room: Room) => {
          // de nuevo, garantizamos que rooms existe
          this.hotel!.rooms = this.hotel!.rooms || [];
          this.hotel!.rooms.push(room);

          this.successMessage = 'Habitación creada exitosamente';
          this.errorMessage = '';
          this.addRoomForm.reset({ capacity: 1, type: 'Estándar', price: 1 });
          setTimeout(() => this.successMessage = '', 3000);
          this.hotelService.updatePrice(this.hotel!.id).subscribe(() => {
            this.ngOnInit();
          });
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Error al crear habitación';
          this.successMessage = '';
        }
      });
  }
}
