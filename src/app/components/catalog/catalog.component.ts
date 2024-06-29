import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {
  products: Product[] = [];

  // productEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor(private _serviceSharingdata : SharingDataService, private router: Router) { 
    this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
  }
  
  onAddCart(product: Product) {
    this._serviceSharingdata.getProductEventEmitter.emit(product);
  }
}