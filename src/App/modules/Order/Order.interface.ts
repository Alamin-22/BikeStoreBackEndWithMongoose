import mongoose from 'mongoose';

//step :1 =>  I have created an Interface and this interface will be used on order.model.ts file to make Schema
export interface TOder {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
