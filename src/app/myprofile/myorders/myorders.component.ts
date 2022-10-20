import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Orders } from 'src/app/entity/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  orders:Orders[]=[]
  constructor(private orderService:OrderService) { }
  profileForm: FormGroup;
  ngOnInit() {
    const promise=this.orderService.getOrdersByUser();
      promise.subscribe((response:any) => {
        console.log(response);
        this.orders= response as Orders[];
        console.log(this.orders[1].productList);
      })
  }

}
