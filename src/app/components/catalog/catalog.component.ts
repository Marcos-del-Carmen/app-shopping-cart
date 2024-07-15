import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private _serviceSharingdata : SharingDataService,
    private _store : Store<{products: any}>
  ) { 
    this._store.select('products').subscribe(state=> {
      this.products = state.products
    })
  }

  ngOnInit(): void {
    this._store.dispatch(load())
  }
  
  onAddCart(product: Product) {
    this._serviceSharingdata.getProductEventEmitter.emit(product);
  }
}