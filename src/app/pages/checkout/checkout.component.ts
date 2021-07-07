import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dataService';
import { CheckoutModel } from './models/checkut.model';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Store } from '../../shared/interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Orders, DetailOrders, Details } from '../../shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  model:CheckoutModel={
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  }
  isDelivery:boolean= true;
  cart:Product[]=[];
  stores:Store[]=[]
  constructor(private dataService:DataService,
    private shoppingCartService:ShoppingCartService,
    private route:Router, private productService:ProductsService) {
      this.checkIfCartIsEmpty();
     }

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
      isDelivery:this.isDelivery
    }
    this.dataService.saveOrder(data)
    .pipe(
      switchMap(({id:orderId})=>{
        let details = this.prepareDetails();
        return this.dataService.saveDetailsOrder({details,orderId});
      }),
      tap(()=>this.route.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(()=> this.shoppingCartService.resetCart())
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
    let updateStock = (stock-quantity);
    details.push({productId,productName,quantity});
      this.productService.updateStock(productId,updateStock)
      .pipe(
        tap(()=>details.push({productId,productName,quantity}))
      )
      .subscribe()
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
  private checkIfCartIsEmpty():void{
    this.shoppingCartService.CartAction$
    .pipe(
      tap((products:Product[])=>{
        if(Array.isArray(products) && !products.length){
          this.route.navigate(['/products']);
        }
      })
    )
    .subscribe()
  }
}
