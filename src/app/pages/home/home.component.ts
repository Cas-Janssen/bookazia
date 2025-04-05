import { Component, inject, OnInit } from '@angular/core';
import { ProductWrapperComponent } from '../product/product-list/product-wrapper.component';

@Component({
  selector: 'app-home',
  imports: [ProductWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
