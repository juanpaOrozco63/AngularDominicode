import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products:Product[] =[];
  
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  constructor() { } 

  get TotalAction$():Observable<number>{
    return this.totalSubject.asObservable();
  }
  get QuantityAction$():Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get CartAction$():Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  public updateCart(product:Product):void{
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }
  private addToCart(product:Product):void{
    let isProductInCart =this.products.find(({id}) =>  id===product.id)
    if(isProductInCart){
      isProductInCart.quantity  +=1;
    }else{
      this.products.push({...product,quantity:1})
    }
    this.cartSubject.next(this.products)
  }
  private quantityProducts():void{
    let quantity= this.products.reduce((acc,prod)=>acc +=prod.quantity,0);
    this.quantitySubject.next(quantity);
  }
  private calcTotal(){
    let total = this.products.reduce((acc,prod)=> acc += (prod.price* prod.quantity),0);
    this.totalSubject.next(total);
  }
  public resetCart():void{
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products=[];
  }
}
