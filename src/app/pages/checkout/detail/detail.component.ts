import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  total$ = this.shoppingCartService.TotalAction$;
  cart$ = this.shoppingCartService.CartAction$;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

}
