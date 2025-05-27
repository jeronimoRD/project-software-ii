import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomService } from '../../services/rooms.service';

interface Room {
  id: string;
  room_number: string;
  type: string;
  price: number;
  is_available: boolean;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rooms: Room[];
}

@Component({
  selector: 'app-admin-rooms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.css'
})
export class AdminRoomsComponent implements OnInit {
    searchForm: FormGroup;
  addRoomForm: FormGroup;
  hotel: Hotel | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {
    this.searchForm = this.fb.group({
      hotelName: ['', [Validators.required, Validators.maxLength(255)]]
    });

    this.addRoomForm = this.fb.group({
      hotel: ['', [Validators.required, Validators.maxLength(255)]],
      room: ['', [Validators.required, Validators.maxLength(10)]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      is_available: [true]
    });
  }

  ngOnInit(): void {}

  searchHotel() {
    if (this.searchForm.invalid) return;

    const hotelName = this.searchForm.value.hotelName;
    this.hotelService.filterHotels(hotelName).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        this.hotel = null;
        this.errorMessage = err.error?.message || 'Error al buscar el hotel';
      }
    });
  }

  addRoom() {
    if (this.addRoomForm.invalid || !this.hotel) return;
    this.addRoomForm.setValue({ hotel: this.hotel.id });
    const roomData = this.addRoomForm.value;

    const Token = localStorage.getItem('accessToken');
    if (!Token) {
      this.errorMessage = 'Debes estar logueado para crear una habitación';
      return;
    }
    this.roomService.createRoom(roomData).subscribe({
      next: (newRoom) => {
        this.hotel?.rooms.push(newRoom);
        this.addRoomForm.reset();
        this.successMessage = 'Habitación agregada exitosamente!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Error al agregar habitación';
      }
    });
  }
}
