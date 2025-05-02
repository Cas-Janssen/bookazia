import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { SavedItemsComponent } from './pages/saved-items/saved-items.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProductWrapperComponent } from './pages/product/product-list/product-wrapper.component';
import { UserProfileEditComponent } from './pages/user/user-profile-edit/user-profile-edit.component';
import { ViewOrdersComponent } from './pages/user/view-orders/view-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id/:details', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'home', redirectTo: '/' },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit',
    component: UserProfileEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/orders',
    component: ViewOrdersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'saved', component: SavedItemsComponent, canActivate: [AuthGuard] },
  { path: 'search/:searchquery', component: ProductWrapperComponent },
  { path: 'books/:categoryname', component: ProductWrapperComponent },
  { path: 'books', component: ProductWrapperComponent },
  { path: '**', component: NotFoundComponent },
];
