import { Request, Response } from 'express';
import { ProductServices } from './Product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    // const product = req.body.product;
    // we can also get the same data using name Alias
    const { product: productData } = req.body; // => this is called name alias.

    //   now this will call service function
    const result = await ProductServices.createProductIntoDB(productData);

    //  send response

    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something Went Wrong.',
      success: false,
      error,
    });
  }
};

export const productControllers = {
  createProduct,
};
