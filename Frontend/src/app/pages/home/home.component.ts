import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newArrivals: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadNewArrivals();
  }

  loadNewArrivals() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.newArrivals = response.filter(
          (product) => product.id > response.length - 4
        );
      },
      error: (err) => {
        console.error('Error loading new arrivals:', err);
      },
    });
  }
}
