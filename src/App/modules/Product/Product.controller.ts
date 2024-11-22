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

// getting all product from DB
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();

    //  send response
    res.status(200).json({
      message: 'Bikes retrieved successfully',
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

// get single product from DB
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId; // we can also get this using destructuring

    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      throw new Error(`Product with ID ${productId} not found.`); // throwing an error message if the product is not found by Id
    }

    //  send response
    res.status(200).json({
      message: 'Single Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Something Went Wrong.',
      success: false,
      error,
    });
  }
};

// update single product from DB
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId; // we can also get this using destructuring
    const updatedData = req.body;

    const result = await ProductServices.UpdateSingleProductFromDB(
      productId,
      updatedData,
    );

    if (!result) {
      throw new Error(`Product with ID ${productId} not found.`); // throwing an error message if the product is not found by Id
    }

    //  send response
    res.status(200).json({
      message: 'Single Bike updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Something Went Wrong.',
      success: false,
      error,
    });
  }
};
// Delete single product from DB
const DeleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId; // we can also get this using destructuring

    const result = await ProductServices.DeleteSingleProductFromDB(productId);

    if (!result) {
      throw new Error(`Product with ID ${productId} not found.`); // throwing an error message if the product is not found by Id
    }

    //  send response
    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Something Went Wrong.',
      success: false,
      error,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  DeleteSingleProduct,
};
