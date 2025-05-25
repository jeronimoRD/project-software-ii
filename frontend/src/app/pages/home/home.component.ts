import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VerticalGridComponent } from '../../components/vertical-grid/vertical-grid.component';
import { HorizontalGridComponent } from '../../components/horizontal-grid/horizontal-grid.component';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';

interface Hotel {
  id: string;
  photo: string;
  name: string;
  location: string;
  lower_price: number;
  higher_price: number;
  rating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatIconModule,
    VerticalGridComponent,
    HorizontalGridComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  searchForm: FormGroup;
  hotels: Hotel[] = []

  cities = ['Bogotá', 'Medellin', 'Cartagena', 'Cali', 'Santa Marta'];
  filteredCities: string[] = this.cities;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router

  ) {
    this.searchForm = this.fb.group({
      name: [''],
      city: [''],
      lower_price: [0],
      higher_price: [0],
      priceRange: [0]
    });
  }

  get priceRangeControl(): FormControl<number> {
    return this.searchForm.get('priceRange') as FormControl<number>;
  }

  filterCities(searchTerm: string) {
    this.filteredCities = this.cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  formatPrice(value: number): string {
    return `$${value.toLocaleString('es-CO')}`;
  }

  navigateToHotel(Id: string) {
    this.router.navigate(['/hotel', Id]);
  }

  submitSearch(): void {
    const hotel = {
      name: this.searchForm.value.name,
      location: this.searchForm.value.city,
      lower_price: this.searchForm.value.lower_price,
      higher_price: this.searchForm.value.higher_price
    };
    this.hotelService.filterHotels(hotel).subscribe({
      next: (response) => {
        console.log('Hoteles encontrados:', response);
        this.hotels = response;
      },
      error: (error) => {
        console.error('Error al buscar los Hoteles:', error);
        console.log(hotel);
        alert('Hubo un error al buscar los Hoteles.');
      }
    });
  }
}