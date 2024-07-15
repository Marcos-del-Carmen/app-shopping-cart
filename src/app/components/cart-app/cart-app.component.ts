import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { Product } from '../../models/product';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';


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

  constructor(
    private router: Router, 
    private _serviceSharingData: SharingDataService , 
    private store : Store<{items : ItemsState}>
  ) {
    this.store.select('items').subscribe(state=>{
      this.items = state.items;
      this.total = state.total;
      this.saveSession();
      console.log('Se actualiza el producto')
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this._serviceSharingData.getProductEventEmitter.subscribe(product => {

      this.store.dispatch(add({product}));
      this.store.dispatch(total());

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Agregaste al carrito ${product.name} :D`,
        showConfirmButton: false
      });
    })
  }

  onDeleteCart() : void {
    this._serviceSharingData.getIdProductEventEmitter.subscribe(id => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Cuidado el producto se va eliminar del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
          // this.items = this.items.filter(item => item.product.id !== id);
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());

          if(this.items.length === 0) {
            sessionStorage.removeItem('cart');
            // sessionStorage.clear();
          }
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
            this.router.navigate(['/cart'], {
              state : {items: this.items, total : this.total}
            })
          })
          Swal.fire({
            title: "Eliminado!",
            text: "El producto se elimino exitosamente",
            icon: "success"
          });
        }
      });
    })
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart() {
    this.showCart = !this.showCart;
  }
}
