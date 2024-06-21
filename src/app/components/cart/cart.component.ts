import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  @Input() cartItem : CartItem[] = [];
  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter();
  @Input() total: number = 0;
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
