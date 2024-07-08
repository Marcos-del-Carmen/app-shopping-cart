import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private _serviceProduct : ProductService,
    private _serviceSharingdata : SharingDataService, 
  ) { }

  ngOnInit(): void {
    this.products = this._serviceProduct.fillAll();
  }
  
  onAddCart(product: Product) {
    this._serviceSharingdata.getProductEventEmitter.emit(product);
  }
}