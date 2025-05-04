import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-grid',
  standalone: true,
  templateUrl: './horizontal-grid.component.html',
  styleUrls: ['./horizontal-grid.component.css'],
})
export class HorizontalGridComponent {
  @Input() title: string = 'Título por defecto';
  @Input() iconUrl: string = '';
  minimized = false;
  maximized = false;

  toggleMinimize() {
    this.minimized = !this.minimized;
    console.log('Minimizado:', this.minimized); // Esto ayudará a depurar
  }
}
