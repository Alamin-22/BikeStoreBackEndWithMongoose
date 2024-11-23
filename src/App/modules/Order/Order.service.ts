import { ProductModel } from '../Product/Product.model';
import { TOder } from './Order.interface';
import { OrderModel } from './Order.model';

const orderAProductFromDB = async (validatedData: Partial<TOder>) => {
  const { product: productId, quantity: orderedQuantity } = validatedData;

  // Find the product and check stock
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error('Product not found.');
  }

  // Checking if the stock is sufficient
  if (product.quantity < orderedQuantity! || product.quantity === 0) {
    throw new Error(
      `Insufficient stock. Available quantity: ${product.quantity}. But You Have Ordered ${orderedQuantity} `,
    );
  }

  // Update product quantity and Stock at the same time
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    {
      $inc: { quantity: -orderedQuantity! }, // Decrease quantity
      $set: { inStock: product.quantity - orderedQuantity! > 0 }, // Update inStock
    },
    { new: true }, // this is used to Return the updated product for further processing
  );

  if (!updatedProduct) {
    throw new Error('Error updating product inventory.');
  }

  // Create an order
  return await OrderModel.create(validatedData);
};

export const OrderServices = {
  orderAProductFromDB,
};
