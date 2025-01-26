import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartState = inject(CartStateService).state;

  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSearch() {
    const searchText = this.searchForm.value.searchText;

    if (searchText) {
      // Navegar a la URL con el query string
      this.router.navigate(['/search'], { queryParams: { query: searchText.trim() } });
    }
  }

}
