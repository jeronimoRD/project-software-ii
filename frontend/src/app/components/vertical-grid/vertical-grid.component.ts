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
  @Input() price: number = 0.00;
  @Input() description: string = 'Sin descripción disponible';
  @Input() location: string = 'Lugar no especificado';
  @Input() comentarios: Array<any> = [];


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