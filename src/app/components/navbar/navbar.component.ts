import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  ngOnInit() {
    console.log(this.items);
  }
  
}
