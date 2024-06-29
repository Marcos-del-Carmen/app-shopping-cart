import { Component, Input, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent, NavbarComponent, CommonModule, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private _serviceSharingData: SharingDataService , public _serviceProduct: ProductService){ }

  ngOnInit(): void {
    this.products = this._serviceProduct.fillAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this._serviceSharingData.getProductEventEmitter.subscribe(product => {
      const hasItem = this.items.find(item => item.product.id === product.id); // el método .find sirve para buscar algo en el arreglo
      if(hasItem) {
        this.items = this.items.map(item => { // me devuelve el arreglo que se tiene modificando y agregando más 1 en la cantidad
          if (item.product.id === product.id){
            return {
              ...item,
              quantity: item.quantity + 1 
            }
          }
          return item
        });
      } else {
        this.items = [ ...this.items, {product: { ...product}, quantity: 1}];
      } // en caso de que no se cumpla me agrega el producto a la lista
      this.calculateTotal();
      this.saveSession();
    })
  }

  onDeleteCart() : void {
    this._serviceSharingData.getIdProductEventEmitter.subscribe(id => {
      this.items = this.items.filter(item => item.product.id !== id);
      if(this.items.length === 0) {
        sessionStorage.removeItem('cart');
        // sessionStorage.clear();
      }
      this.calculateTotal();
      this.saveSession();
    })
  }

  calculateTotal(): void {
    this.total = this.items.reduce( (accumulator, item)=>accumulator + item.quantity * item.product.price, 0);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart() {
    this.showCart = !this.showCart;
  }
}
