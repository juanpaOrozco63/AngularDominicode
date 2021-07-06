import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // Comunicación de componente PADRE a HIJO
  @Input() product:Product;
    // Comunicación de componente HIJO a  PADRE
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    this.addToCartClick.emit(this.product)
  }
}
