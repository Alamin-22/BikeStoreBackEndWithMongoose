import { Schema, model, connect } from 'mongoose';
import { TProduct } from './Product.interface';

// creating a schema for Product
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  // this is called Enum type in Mongoose => this is only used for predefined property that will never gonna change
  category: {
    type: String,
    enum: {
      values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      message:
        "Bike Category Must be the following =>  'Mountain', 'Road', 'Hybrid', 'Electric'",
    },
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});
