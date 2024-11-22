import { TProduct } from './Product.interface';
import { ProductModel } from './Product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
