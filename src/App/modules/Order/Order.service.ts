import { TOder } from './Order.interface';
import { OrderModel } from './Order.model';

const orderAProductFromDB = async (ValidatedDataUsingZod: Partial<TOder>) => {
  console.log(ValidatedDataUsingZod);
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  orderAProductFromDB,
};
