import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  quantity$ = this.shoppingCartService.QuantityAction$;
  total$ = this.shoppingCartService.TotalAction$;
  cart$ = this.shoppingCartService.CartAction$;

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

}
