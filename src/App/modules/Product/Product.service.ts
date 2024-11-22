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

// Update single product from DB

const UpdateSingleProductFromDB = async (
  productId: string,
  updateData: Partial<TProduct>,
) => {
  // I have added (_id) => because I am searching on _Id filed and Updated this docs
  const UpdatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }, // Options: return updated doc, run validators
  );

  return { UpdatedProduct };
};

//  delete a single Product From The DB

const DeleteSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);

  // after deleting returning the empty data to the response
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  UpdateSingleProductFromDB,
  DeleteSingleProductFromDB,
};
