import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-reserve',
  imports: [],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  reserveForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reserveForm = this.fb.group({
      room: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      userEmail: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      paymetod: ['tarjeta', Validators.required],
    });
  }

  get hoy() {
    return new Date().toISOString().split('T')[0];
  }
  onSubmit() {
    if (this.reserveForm.valid) {
      console.log('Formulario válido');
    } else {
      this.reserveForm.markAllAsTouched();
    }
  }
}