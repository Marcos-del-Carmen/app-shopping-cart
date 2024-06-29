import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  _productEventEmitter : EventEmitter<Product> = new EventEmitter();
  _idProductEventEmitter : EventEmitter<number> = new EventEmitter();

  constructor() { }

  get getIdProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter
  }

  get getProductEventEmitter() : EventEmitter<Product> {
    return this._productEventEmitter;
  }
}
