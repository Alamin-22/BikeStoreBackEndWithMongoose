import express from 'express';
import { orderControllers } from './Order.controller';

const router = express.Router();

// order a bike

router.post('/', orderControllers.orderAProduct);

// exporting Orders Route

export const OrderRouts = router;
