import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  quantity$ = this.shoppingCartService.QuantityAction$;
  total$ = this.shoppingCartService.TotalAction$;
  cart$ = this.shoppingCartService.CartAction$;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

}
