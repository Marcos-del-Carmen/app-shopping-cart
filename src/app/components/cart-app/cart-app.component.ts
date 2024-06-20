import { Component, Input, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';


@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  constructor(public _serviceProduct: ProductService){ }

  ngOnInit(): void {
    this.products = this._serviceProduct.fillAll();
  }

  onAddCart(product: Product) {
    
    this.items = [ ...this.items, {product: { ...product}, quantity: 1}];
  }
}
