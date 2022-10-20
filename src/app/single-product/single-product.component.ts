import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../entity/product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  product:Product=new Product
  simillarProducts:Product[]=[];
  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.productService.getProductById(localStorage.getItem("product")).subscribe((response:any) => {
       this.product=response;
    });

    this.productService.getProductByName(this.product.productName).subscribe((response:any) => {
      console.log(this.product.productName)
      this.simillarProducts= response as Product[];
      console.log(this.simillarProducts)
   });
  }

  messages = [
    {
      image: 'data:image/jpeg;base64,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',
      name: 'Salaman Khan',
      details: 'Sales dashboard have been created',
      time: '9.30 AM'
    },
    {
      image: 'data:image/jpeg;base64,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',
      name: 'Shahrukh Khan',
      details: 'Sales dashboard have been created',
      time: '9.30 AM'
    },
    {
      image: 'data:image/jpeg;base64,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',
      name: 'Katrina Kaif',
      details: 'Sales dashboard have been created',
      time: '9.30 AM'
    },{
      image: 'data:image/jpeg;base64,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',
      name: 'Salaman Khan',
      details: 'Sales dashboard have been created',
      time: '9.30 AM'
    }
  ];
  // foods = [
  //   { value: 'steak-0', viewValue: 'Small' },
  //   { value: 'pizza-1', viewValue: 'Medium' },
  //   { value: 'tacos-2', viewValue: 'Large' }
  // ];


}
