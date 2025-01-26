import { Component } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  currentCategory: number = 0; // Categoría inicial
  categoriesCount: number = 5; // Número total de categorías
  translateXValue: number = 0; // Posición para el desplazamiento del carrusel

  // Método para mover el carrusel
  move(direction: string): void {
    if (direction === 'next') {
      if (this.currentCategory < this.categoriesCount - 1) {
        this.currentCategory++;
      }
    } else if (direction === 'prev') {
      if (this.currentCategory > 0) {
        this.currentCategory--;
      }
    }
    this.updateTranslateX();
  }

  // Actualizamos el valor de translateX
  updateTranslateX(): void {
    this.translateXValue = -(this.currentCategory * 100); // Desplazamos el carrusel
  }

  // Obtenemos el valor de translateX para aplicarlo en el estilo
  getTranslateX(): string {
    return `translateX(${this.translateXValue}%)`; // Convertimos a porcentaje
  }
}
