import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { SavedItemsComponent } from './pages/saved-items/saved-items.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'home', redirectTo: '/' },
  {
    path: 'account',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'saved', component: SavedItemsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
