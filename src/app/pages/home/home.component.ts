import { Component } from '@angular/core';
import { ProductWrapperComponent } from '../../components/product-list/product-wrapper.component';

@Component({
  selector: 'app-home',
  imports: [ProductWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
