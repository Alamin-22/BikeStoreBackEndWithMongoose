import express, { Request, Response } from 'express';
import cors from 'cors';
import { productsRoutes } from './App/modules/Product/Product.route';
import { OrderRouts } from './App/modules/Order/Order.route';
const app = express();

// parser Start

app.use(express.json());
app.use(cors());

// Application routes
// for Products Routs
app.use('/api/products', productsRoutes);
// For Orders Routs
app.use('/api/orders', OrderRouts);
// parser End

app.get('/', (req: Request, res: Response) => {
  res.send('Bike Store Server Is Running ');
});

export default app;
