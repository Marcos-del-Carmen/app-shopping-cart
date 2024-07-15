import { Component, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items : CartItem[] = [];
  total: number = 0;
  
  constructor(
    private _sharingDataService: SharingDataService, 
    private store : Store<{items: ItemsState}>
  ) { 
    this.store.select('items').subscribe(store=>{
      this.items = store.items;
      this.total = store.total;
    });
  }

  ngOnInit(){
    // this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    this._sharingDataService.getIdProductEventEmitter.emit(id);

  }

}
