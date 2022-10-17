import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  product:Product= new Product
  constructor(private productService:ProductService) { }

  addProduct(){
    this.productService.addProduct(this.product).subscribe(
      (response: any) => {
        console.log(response);
        alert(response.message)
        // this.product=new Product;
      },
      error=>{
        alert(error.error.message);
      }
    );
  }


  ngOnInit() {
  }

}
