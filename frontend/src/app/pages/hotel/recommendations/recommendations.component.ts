import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommends',
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
  imports: [FormsModule],
  providers: []
})
export class RecommendationsComponent {
  constructor(private router: Router) {}
}
