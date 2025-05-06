import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-vertical-grid',
  standalone: true,
  imports: [CommonModule], 
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
  @Input() id!: string; 
  @Output() cardClicked = new EventEmitter<string>();

  ngOnInit() {
    if (!this.imageUrl) this.imageUrl= '/predeterminada.png';

  }
  ngAfterViewInit() {
    console.log( "cargada la imagen", this.imageUrl);
  }

  minimized: boolean = true; 

  toggleMinimize() {
    this.minimized = !this.minimized;
    console.log('Estado minimizado:', this.minimized);
  }

  onCardClick(event: Event) {
    event.stopPropagation();
    this.cardClicked.emit(this.id);
  }
}