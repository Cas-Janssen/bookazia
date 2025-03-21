import { Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { LoginComponent } from './pages/login/login.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'book/:id',
    component: BookDetailComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];
