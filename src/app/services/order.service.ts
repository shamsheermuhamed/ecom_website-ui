import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../entity/order';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private loginService:LoginService) { }

  createOrder(order:Orders){
    return this.httpClient.post("http://localhost:8090/api/shopping/createorder",order, {headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.loginService.getToken()}`,
      })});
  }

  getOrdersByUser(){
    return this.httpClient.get("http://localhost:8090/api/shopping/getordersbyuser/"+ this.loginService.getUserId(), {headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.loginService.getToken()}`,
      })});
  }
}
