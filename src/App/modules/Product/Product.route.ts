import express from 'express';
import { productControllers } from './Product.controller';

const router = express.Router();

// after hitting api/products url this will call a controller function which will handle all of the stuff
router.post('/', productControllers.createProduct);

// get all the products form the DB
router.get('/', productControllers.getAllProducts);

// get single products form the DB
router.get('/:productId', productControllers.getSingleProduct);

export const productsRoutes = router;
