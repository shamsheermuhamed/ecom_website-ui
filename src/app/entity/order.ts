import { Product } from './product';
import { Users } from './user';

export class Orders {
    id: string;
    productList:Product[];
    user:Users
    orderPrice:number
}