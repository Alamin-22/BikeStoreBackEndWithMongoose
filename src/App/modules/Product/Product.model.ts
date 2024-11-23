import { Schema, model } from 'mongoose';
import { TProduct } from './Product.interface';

//  I have used Mongoose inbuilt Type Validation

// creating a schema for Product
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      // custom validation and capitalize  the Name
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

          return firstNameStr === value;
        },
        message: '{VALUE} is not in capitalized format',
      },
    },
    brand: { type: String, required: [true, 'brand is Required'], trim: true },
    price: { type: Number, required: [true, 'price Is Required'] },
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
    description: {
      type: String,
      required: [true, 'description is required'],
      maxlength: 150,
      trim: true,
    },
    quantity: { type: Number, required: [true, 'quantity is required']  },
    inStock: { type: Boolean, required: [true, 'inStock Is Required'] },
  },
  {
    timestamps: true, /// enabling Timestamps to allow createdAt and UpdatedAt filed into the Client Response
  },
);

// 3. Create a product Model.

export const ProductModel = model<TProduct>('product', productSchema);
