import express, { Request, Response } from 'express';
import cors from 'cors';
import { productsRoutes } from './App/modules/Product/Product.route';
const app = express();

// parser Start

app.use(express.json());
app.use(cors());

// Application routes

app.use('/api/products', productsRoutes);

// parser End

app.get('/', (req: Request, res: Response) => {
  res.send('Bike Store Server Is Running ');
});

export default app;
