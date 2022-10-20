import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private loginService:LoginService) { }

  deleteProductByUserId(userId:any){     
    return this.httpClient.delete("http://localhost:8095/api/shopping/product/deleteproductsbyuser/"+userId);
  }

  addToCart(productId:any){  
    let values={userId:this.loginService.getUserId(),productId:productId}   
    return this.httpClient.post("http://localhost:8095/api/shopping/product/addtocart",values);
  }

  deleteCartProduct(productId:any){
    return this.httpClient.delete("http://localhost:8095/api/shopping/product/deletecartproduct/"+
    this.loginService.getUserId()+"/"+productId);
  }
}
