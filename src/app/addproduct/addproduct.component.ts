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
  featuresList:Array<string>=[];
  addFeatureflag:boolean=false;
  showFeature:boolean=false;
  constructor(private productService:ProductService) { }

  addProduct(){
    this.product.features=this.featuresList;
    this.productService.addProduct(this.product).subscribe(
      (response: any) => {
        console.log(response);
        alert(response.message)
        this.product=new Product;
      },
      error=>{
        alert(error.error.message);
      }
    );
  }

  addFeature()
  {
    this.addFeatureflag=true;
    this.showFeature=false;
  }

  OK(feature:any){
    console.log(feature)
    this.featuresList.push(feature);
    this.addFeatureflag=false;
    this.showFeature=true;
  }

  ngOnInit() {
  }

}
