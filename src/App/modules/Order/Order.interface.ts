import mongoose from 'mongoose';

//step :1 =>  I have created an Interface and this interface will be used on order.model.ts file to make Schema
export interface TOder {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

// creating a Custom Error Type to send with Status
export class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message); // Pass this error  message to the Original Error constructor
    this.status = status;
  }
}
