import { TOder } from './Order.interface';
// import { OrderModel } from './Order.model';

const orderAProductFromDB = async (ValidatedDataUsingZod: Partial<TOder>) => {
  console.log('From Terminal', ValidatedDataUsingZod);
  // const result = await OrderModel.find();

  // Until we implement our logic
  return ValidatedDataUsingZod;
};

export const OrderServices = {
  orderAProductFromDB,
};
