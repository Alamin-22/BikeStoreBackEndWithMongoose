import { TOder } from './Order.interface';
import { OrderModel } from './Order.model';

const orderAProductFromDB = async (orderData: Partial<TOder>) => {
  console.log(orderData);
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  orderAProductFromDB,
};
