import express from 'express';
import { productControllers } from './Product.controller';

const router = express.Router();

// after hitting api/products url this will call a controller function which will handle all of the stuff
router.post('/create_product', productControllers.createProduct);

export const productsRoutes = router;
