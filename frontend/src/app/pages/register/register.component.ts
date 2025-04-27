import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  providers: [UserService], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
    firstName: string = '';
    lastName: string = '';
    username: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    
  constructor(private userService: UserService) {}

  registerUser(): void {
    const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password
    };

    this.userService.register(user).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        alert('Usuario registrado exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar el Usuario:', error);
        alert('Hubo un error al registrar el Usuario.');
      }
    });
  }
}