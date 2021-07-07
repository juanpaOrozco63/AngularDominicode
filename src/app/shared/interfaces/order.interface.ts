export interface Details{
productId:number;
productName:string;
quantity:number;

}
export interface Orders{
    name:string;
    shippingAddress:string;
    city:string;
    date:string;
    pickup:boolean;
    id:number;
}

export interface DetailOrders{
    details:Details[];
    orderId:number;
    id?:number;
}