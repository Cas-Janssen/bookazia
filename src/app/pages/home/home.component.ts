import { Component, inject, OnInit } from '@angular/core';
import { ProductWrapperComponent } from '../product/product-list/product-wrapper.component';
import { SharedProductSearchService } from '../../shared/shared-product-search.service';

@Component({
  selector: 'app-home',
  imports: [ProductWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private sharedProductSearchService: SharedProductSearchService = inject(
    SharedProductSearchService
  );

  ngOnInit(): void {
    this.sharedProductSearchService.clearSelectedCategory();
  }
}
