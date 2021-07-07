import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  gotToCheckout():void{
this.route.navigate(['/checkout'])
  }
}
