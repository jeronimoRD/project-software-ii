import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommends',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  imports: [FormsModule],
  providers: []
})
export class ReviewsComponent {
  constructor(private router: Router) {}
}
