import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RecommendationsComponent } from './pages/hotel/recommendations/recommendations.component';
import { RoomsComponent } from './pages/hotel/rooms/rooms.component';
import { ReviewsComponent } from './pages/hotel/reviews/reviews.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hotel/:id', component: HotelComponent,
    children: [
      { path: 'recommendations', component: RecommendationsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: '', redirectTo: 'recommendations', pathMatch: 'full' } 
    ]
  },
  { path: '**', redirectTo: '' }
];