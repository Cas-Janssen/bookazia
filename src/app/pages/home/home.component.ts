import { Component, inject, OnInit } from '@angular/core';
import { ProductWrapperComponent } from '../../components/product-list/product-wrapper.component';
import { SharedCategoryService } from '../../shared/shared-category.service';

@Component({
  selector: 'app-home',
  imports: [ProductWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private sharedCategoryService: SharedCategoryService = inject(
    SharedCategoryService
  );

  ngOnInit(): void {
    this.sharedCategoryService.clearSelectedCategory();
  }
}
