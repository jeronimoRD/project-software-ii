import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [UserService], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
    name: string = '';
    last_name: string = '';
    username: string = '';
    password: string = '';
    correo: string = '';
    phone: string = '';

  constructor(private userService: UserService) {}

  registerUser(): void {
    const user = {
        name: this.name,
        last_name: this.last_name,
        username: this.username,
        password: this.password,
        correo: this.correo,
        phone: this.phone
    };

    this.userService.register(user).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        alert('Usuario registrado exitosamente');
      },
      (error) => {
        console.error('Error al registrar el Usuario:', error);
        alert('Hubo un error al registrar el Usuario.');
      }
    );
  }
}