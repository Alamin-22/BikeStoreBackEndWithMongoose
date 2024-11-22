import { TProduct } from './Product.interface';
import { ProductModel } from './Product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);

  return result;
};
// get all products form the DB
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product from DB

const getSingleProductFromDB = async (productId: string) => {
  // I have added (_id) => because I am searching on _Id filed
  const result = await ProductModel.findOne({ _id: productId });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
