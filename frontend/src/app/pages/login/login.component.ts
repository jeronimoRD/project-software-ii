import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  loginUser(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    this.userService.login(user).subscribe({
      next: (response) => {
        console.log('Usuario logueado exitosamente:', response);
        alert('Usuario logueado exitosamente');
      },
      error: (error) => {
        console.error('Error al loguear el Usuario:', error);
        alert('Hubo un error al loguear el Usuario.');
      }
    });
  }

}
