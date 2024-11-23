import express from 'express';
import { orderControllers } from './Order.controller';

const router = express.Router();

// order a bike
router.post('/', orderControllers.orderAProduct);
router.get('/revenue', orderControllers.getOrdersRevenue);

// exporting Orders Route

export const OrderRouts = router;
