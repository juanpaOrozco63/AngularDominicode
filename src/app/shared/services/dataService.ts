import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from '../interfaces/stores.interface';
import { Details, Orders, DetailOrders } from '../interfaces/order.interface';

@Injectable({
    providedIn:'root'
})
export class DataService{
    private apiURL = 'http://localhost:3000';
    constructor(private http:HttpClient){}
    getStores():Observable<Store[]>{
        return this.http.get<Store[]>(this.apiURL+'/stores');
    }

    saveOrder(order:Orders):Observable<Orders>{
        return this.http.post<Orders>(`${this.apiURL}/orders`,order);
    }
    saveDetailsOrder(detail:DetailOrders):Observable<DetailOrders>{
        return this.http.post<DetailOrders>(this.apiURL+'/detailsOrders',detail)
    }
}