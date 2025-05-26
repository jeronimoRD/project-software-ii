// src/app/pages/hotel/reviews/reviews.component.ts
import { Component, OnInit } from '@angular/core';
import {
  CommonModule,   
  NgIf,
  NgForOf
} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule     } from '@angular/material/input';
import { MatButtonModule    } from '@angular/material/button';
import { MatIconModule      } from '@angular/material/icon';
import { ReviewsService } from '../../../services/reviews.serivce';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ReviewsComponent implements OnInit {
  reviewForm!: FormGroup;
  reviews: any[] = [];
  loading     = true;
  userLogged  = false;
  hotelId!: string;

  constructor(
    private fb: FormBuilder,
    private reviewsSvc: ReviewsService,
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {
    this.reviewForm = this.fb.group({
      title:   ['', Validators.required],
      content: ['', Validators.required],
      rating:  [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
    this.hotelId   = this.route.parent!.snapshot.paramMap.get('id')!;
    this.userLogged = !!localStorage.getItem('accessToken');
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsSvc.getHotelReviews(this.hotelId).subscribe(res => {
      this.reviews = res;
      this.loading = false;
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;
    const payload = {
      hotelId: this.hotelId,
      ...this.reviewForm.value
    };

    this.reviewsSvc.createReview(payload).subscribe({
      next: () => {
        this.reviewForm.reset({ rating: 5 });
        this.hotelService.updateRating(this.hotelId)
        this.loadReviews();
      },
      error: err => console.error('Error creando reseña', err)
    });
  }
}