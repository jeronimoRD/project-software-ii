import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amdin-hotel',
  standalone : true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './amdin-hotel.component.html',
  styleUrl: './amdin-hotel.component.css'
})
export class AmdinHotelComponent {

  hotelForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
  ) {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      location: ['', [Validators.required, Validators.maxLength(255)]],
      photo: ['', [Validators.pattern('https?://.+')]],
      description: ['', [Validators.maxLength(2000)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.hotelForm.invalid) return;

    const currentUser = localStorage.getItem('accessToken');
    if (!currentUser) {
      this.errorMessage = 'Debes estar logueado para crear un hotel';
      return;
    }
    const hotelData = {
      ...this.hotelForm.value,
      user_id: currentUser.sub
    };

    this.hotelService.createHotel(hotelData).subscribe({
      next: (res) => {
        this.successMessage = 'Hotel creado exitosamente!';
        this.errorMessage = '';
        this.hotelForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Error al crear el hotel';
        this.successMessage = '';
      }
    });
  }
}