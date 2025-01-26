import { Component } from '@angular/core';
import { CategoryCardComponent } from '../../ui/category-card/category-card.component';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

}
