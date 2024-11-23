import { Schema, model } from 'mongoose';
import { TOder } from './Order.interface';

// step 2=> create a schema using exported Interface
const OrderSchema = new Schema<TOder>({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'products' }, // Use Schema.Types.ObjectId because we are using mongoose ObjectId
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

// step:3 => create a Modal Using Created Schema

export const OrderModel = model<TOder>('order', OrderSchema); ///=> here (order) refers to the collection name that will be created
