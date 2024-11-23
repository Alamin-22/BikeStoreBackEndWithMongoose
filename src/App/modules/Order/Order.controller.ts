import { Request, Response } from 'express';
import { OrderServices } from './Order.service';

const orderAProduct = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.orderData;
    //
    const result = await OrderServices.orderAProductFromDB(orderData);
    // after all processing sending Response
    res.status(200).json({
      message: 'Bike created successfully',
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
