import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from '../entity/product';
import { LoginComponent } from '../login/login.component';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product:Product=new Product
  productList:Product[]=[];
  adminLoggedIn=false;
  userLoggedIn=false;

  constructor(private router: Router, private productService: ProductService,
    private loginservice:LoginService, private cartService:CartService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    const promise = this.productService.getAllProduct();
      promise.subscribe((response) => {
        console.log(response);
        this.productList= response as Product[];
        console.log(this.productList);
      });
      if(this.loginservice.getRoles()=='ROLE_USER'){
          this.userLoggedIn=true;
      }
      else if(this.loginservice.getRoles()=='ROLE_ADMIN'){
        this.adminLoggedIn=true;
      }
      else{
        this.userLoggedIn=false;
        this.adminLoggedIn=false;
      }
  }

  updateProduct(product:any){
    this.router.navigate(['/updateproduct'], {
      state: {
        data: product
      }});
  }

  deleteProduct(productId:any){
    this.productService.deleteProduct(productId).subscribe((response:any) => {
      alert(response.message);
      // this.router.navigate(['products']);
      window.location.href="/home";
    });    
  }

  viewProduct(productId:any){
    localStorage.setItem("product",productId);
    this.router.navigate(['/singleproduct']);
  }

  addToCart(productId:any){
    if(this.userLoggedIn){
      this.cartService.addToCart(productId).subscribe((response:any) => {
        alert(response.message);
      },
      (error)=>{
        alert(error.error);
      }
      );
    }
    else{
      this.dialog.open(LoginComponent, {
      });
    }
    
  }
}
