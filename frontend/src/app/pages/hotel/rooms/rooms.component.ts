import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
  imports: [FormsModule],
  providers: []
})
export class RoomsComponent {
  constructor(private router: Router) {}
}
