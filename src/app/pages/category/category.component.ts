import { Component } from '@angular/core';
import { ProductWrapperComponent } from '../../components/product-list/product-wrapper.component';

@Component({
  selector: 'app-category',
  imports: [ProductWrapperComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {}
