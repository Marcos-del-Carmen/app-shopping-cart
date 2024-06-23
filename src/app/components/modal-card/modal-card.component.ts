import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-modal-card',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './modal-card.component.html'
})
export class ModalCardComponent {
  @Input() cartItem : CartItem[] = [];
  // @Input() total: number = 0;

  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter();
  @Output() showcartEventEmitter = new EventEmitter();
  
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  openCart() {
    this.showcartEventEmitter.emit();
  }
}
