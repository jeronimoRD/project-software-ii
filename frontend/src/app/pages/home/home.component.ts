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
    HorizontalGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchForm: FormGroup;
  sampleHotels = [
    {
      imageUrl: 'assets/hotel1.jpg',
      name: 'Hotel Playa Paradisíaca',
      description: 'Resort todo incluido frente al mar',
      price: 450000,
      location: 'Cartagena',
      comments: ['Excelente servicio', 'Piscinas espectaculares']
    },
    {
      imageUrl: 'assets/hotel2.jpg',
      name: 'Hotel Montaña Mágica',
      description: 'Cabañas de lujo en medio de la naturaleza',
      price: 320000,
      location: 'Santa Marta',
      comments: ['Vistas increíbles', 'Desayuno gourmet']
    },
    {
      imageUrl: 'assets/hotel3.jpg',
      name: 'Hotel Ciudad Moderna',
      description: 'Hotel urbano con amenities de lujo',
      price: 280000,
      location: 'Medellín',
      comments: ['Ubicación perfecta', 'Habitaciones espaciosas']
    }
  ];

  countries = ['Colombia', 'Argentina', 'México', 'España', 'Chile'];
  cities = ['Bogotá', 'Medellín', 'Cartagena', 'Cali', 'Santa Marta'];
  filteredCountries: string[] = this.countries;
  filteredCities: string[] = this.cities;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      country: this.fb.control(''),
      city: this.fb.control(''),
      priceRange: this.fb.control(100000),
      guests: this.fb.control(2),
      rooms: this.fb.control(1)
    });
  }

  get priceRangeControl(): FormControl<number> {
    return this.searchForm.get('priceRange') as FormControl<number>;
  }

  filterCountries(searchTerm: string) {
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  filterCities(searchTerm: string) {
    this.filteredCities = this.cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  formatPrice(value: number): string {
    return `$${value.toLocaleString('es-CO')}`;
  }

  submitSearch() {
    console.log('Parámetros de búsqueda:', this.searchForm.value);
  }
}