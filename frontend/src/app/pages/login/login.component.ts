import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  providers: [UserService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  loginUser(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    this.userService.login(user).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        console.log('Usuario logueado exitosamente:', response);
        alert('Usuario logueado exitosamente');
      },
      error: (error) => {
        console.error('Error al loguear el Usuario:', error);
        alert('Hubo un error al loguear el Usuario.');
        console.log(user);
      }
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('Usuario desconectado exitosamente');
  }
}
