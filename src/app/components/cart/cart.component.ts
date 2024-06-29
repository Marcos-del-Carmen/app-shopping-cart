import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  items : CartItem[] = [];
  total: number = 0;
  

  constructor(private _sharingDataService: SharingDataService, private router: Router){ 
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];

  }

  onDeleteCart(id: number) {
    this._sharingDataService.getIdProductEventEmitter.emit(id);
    
  }

}
