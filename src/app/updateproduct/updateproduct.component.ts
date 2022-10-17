import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnInit {

  product:Product= new Product
  constructor(private productService:ProductService) { }

  updateProduct(){
    this.productService.updateProduct(this.product).subscribe(
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
    console.log()
      this.product=history.state.d