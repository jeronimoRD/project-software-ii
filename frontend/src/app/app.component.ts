import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { RegisterComponent } from "./pages/register/register.component";
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./pages/login/login.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}