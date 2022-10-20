import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/entity/order';
import { Product } from 'src/app/entity/product';
import { Users } from 'src/app/entity/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  product:Product=new Product
  productList:Product[]=[]
  order:Orders=new Orders
  user:Users=new Users
  subTotal:number=0;
  grandTotal:number=0;
  deliveryCharge:number=0;
  orderPresent:boolean=false;
 
  constructor(private productService:ProductService, private orderService:OrderService,
        private loginService:LoginService, private cartService:CartService, private router:Router) { }

  ngOnInit() {
      const promise=this.productService.getCartProductsByUser();
      promise.subscribe((response) => {
        console.log(response);
        this.productList= response as Product[];
        this.addTotal(this.productList);
      })
  }
  addTotal(productList:any){
      if(productList.length>0){
        for(let i=0;i<productList.length;i++){
          this.subTotal+= productList[i].price;
        }
        this.orderPresent=true;
        this.deliveryCharge= 6;
        this.grandTotal= this.subTotal+ this.deliveryCharge;
      }           
  }
  
  placeOrder(){
    this.order.productList= this.productList;
    this.user.id=this.loginService.getUserId();
    this.order.user=this.user;
    this.order.orderPrice=this.grandTotal;
    this.orderService.createOrder(this.order).subscribe((response:any) => {
        console.log(response);
        alert(response.message);
            
      });
      console.log(this.user.id)
      this.cartService.deleteProductByUserId(this.user.id).subscribe((response:any) => {
        console.log(response);
      });
      this.router.navigate(['/shopping-cart']);
  }

  deleteCartProduct(productId:any){
    this.cartService.deleteCartProduct(productId).subscribe((response:any) => {
      alert(response.message);
      window.location.href='/shopping-cart';  
    });
  }
}
