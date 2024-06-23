import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges {
  @Input() items : CartItem[] = [];
  @Input() total: number = 0;
  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce( (accumulator, item)=>accumulator + item.quantity * item.product.price, 0);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
