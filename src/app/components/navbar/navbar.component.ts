import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  showCart: boolean = false;
  @Input() items: CartItem[] = [];
  @Output() showcartEventEmitter = new EventEmitter();

  openCart() {
    this.showcartEventEmitter.emit();
    this.showCart = !this.showCart;
  }
}
