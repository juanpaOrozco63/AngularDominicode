import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dataService';
import { CheckoutModel } from './models/checkut.model';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '../../shared/interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Orders, DetailOrders, Details } from '../../shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  model:CheckoutModel={
    name:'Juan Pablo Orozco',
    store:'Tiendita',
    shippingAddress:'xd',
    city:'xdd'
  }
  isDelivery:boolean= false;
  cart:Product[]=[];
  stores:Store[]=[]
  constructor(private dataService:DataService,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.getStore();
    this.getDataCart();
  }
   onPickupOrDelivery(option:boolean):void{
    this.isDelivery= option;
  }
  onSubmit({value:formData}:NgForm):void{
    let data:Orders={
      ...formData,
      date:this.getCurrencyDay,
      pickup:this.isDelivery
    }
    this.dataService.saveOrder(data)
    .pipe(
      switchMap((order)=>{
        let details = this.prepareDetails();
        let orderId = order.id;
        return this.dataService.saveDetailsOrder({details,orderId});
      }),
    )
    .subscribe();
  }
  private getStore():void{
    this.dataService.getStores()
    .pipe(
      tap((store:Store[])=>this.stores=store)
    )
    .subscribe()
  }
  private getCurrencyDay():string{
    return new Date().toLocaleDateString()
  }

  private prepareDetails():Details[]{
    let details:Details[]=[];
    this.cart.forEach((product:Product)=>{
    let {id:productId,name:productName,quantity,stock}=product;
    details.push({productId,productName,quantity});
    })
    return details; 

  }
  private getDataCart():void{
    this.shoppingCartService.CartAction$
    .pipe(
      tap((products:Product[])=>this.cart = products)
    )
    .subscribe();
  }
}
