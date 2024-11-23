import { Request, Response } from 'express';
import { OrderServices } from './Order.service';
import orderValidationSchema from './Order.validation';

const orderAProduct = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.orderData;

    // create a schema Validation Using Zod and get the validated data and pass this validated data to the server for query

    const ValidatedDataUsingZod = orderValidationSchema.parse(orderData);
    //
    const result = await OrderServices.orderAProductFromDB(
      ValidatedDataUsingZod,
    );
    // after all processing sending Response
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something Went Wrong.',
      success: false,
      error,
    });
  }
};

export const orderControllers = {
  orderAProduct,
};
