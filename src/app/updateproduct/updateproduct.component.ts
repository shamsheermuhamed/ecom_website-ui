import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnInit {

  featuresList:Array<string>=[];
  addFeatureflag:boolean=false;
  showFeature:boolean=true;
  product:Product= new Product
  constructor(private productService:ProductService) { 
  
  }

  updateProduct(){
    
    this.product.features=this.featuresList;
    // console.log("hello"+ this.product)
    this.productService.updateProduct(this.product).subscribe(
      (response: any) => {
        console.log(response);
        alert(response.message)
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

  OK(feature:string){
    this.featuresList.push(feature);
    this.addFeatureflag=false;
    this.showFeature=true;
  }

  ngOnInit() {  
      this.product=history.state.data;
      this.featuresList=this.product.features;
  }

}
