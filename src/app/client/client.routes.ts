import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';

export default [
  {
    path: '',
    component: ClientComponent,
    loadChildren: () => import('./components/home/home.routes')
  },
  { 
    path: 'cart', 
    component: ClientComponent,
    loadChildren: () => import('./components/cart/cart.routes') 
  },
  { 
    path: 'products', 
    component: ClientComponent,
    loadChildren: () => import('./components/products/features/product-shell/product.route') 
  },
  { 
    path: 'search', 
    component: ClientComponent,
    loadChildren: () => import('./components/search/features/search-shell/search.routes') 
  },
  { 
    path: 'payment-process', 
    component: ClientComponent,
    loadChildren: () => import('../payment/payment-shell/payment.routes') 
  },
] as Routes;
