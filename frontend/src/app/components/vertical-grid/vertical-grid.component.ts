import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-vertical-grid',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './vertical-grid.component.html',
  styleUrls: ['./vertical-grid.component.css'],
})
export class VerticalGridComponent {
  @Input() imageUrl: string = './predeterminada.png';
  @Input() title: string = 'Título por defecto';
  @Input() location: string = 'Lugar no especificado';
  @Input() lower_price: number = 0;
  @Input() higher_price: number = 0;
  @Input() rating: number = 0;


  ngOnInit() {
    // Forzar los valores predeterminados a mostrarse si no se pasan desde el padre.
    if (!this.imageUrl) this.imageUrl= './imagenes-recursos/posters/predeterminada.png';

  }
  ngAfterViewInit() {
    console.log( "cargada la imagen", this.imageUrl);
  }

  minimized: boolean = true; // Comienza minimizado

  toggleMinimize() {
    this.minimized = !this.minimized;
    console.log('Estado minimizado:', this.minimized);
  }
}