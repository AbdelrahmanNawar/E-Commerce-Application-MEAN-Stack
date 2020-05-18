import { userModel } from './userModel';
import { productModel } from './productModel';

export interface orderModel{
    _id?:string,
    user?: userModel,
    products:[{Product:productModel,count:number}],
    date?: Date,
    status?:string,
    cost?:number

}
