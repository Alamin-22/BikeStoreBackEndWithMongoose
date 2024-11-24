# Professional Backend Project for BikeStoreServer

This guide outlines how to set up a **professional backend project** using **TypeScript**, **Express**, **Mongoose**, **Zod**, and other essential tools. The project follows a **modular design pattern** for scalability, maintainability, and clean code.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (latest stable version)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **TypeScript** as a development dependency

---

## Steps to Set Up the Project

### Step 1: Install Dependencies

Run the following commands to install the required packages:

```bash
# Install runtime dependencies
npm install express mongoose dotenv cors zod

# Install development dependencies
npm install -D typescript ts-node-dev @types/node @types/express eslint prettier
```

---

### Step 2: Initialize TypeScript

Generate a TypeScript configuration file by running:

```bash
tsc --init
```

Update the `tsconfig.json` file to include the following configuration:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

### Step 3: Project Folder Structure

Organize your project using the following structure:

```
project-root/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── index.ts
│   ├── modules/
│   │   ├── product/
│   │   │   ├── product.interface.ts
│   │   │   ├── product.model.ts
│   │   │   ├── product.route.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── product.validation.ts
│   │   │   └── product.service.ts
│   │   ├── order/
│   │   │   ├── order.interface.ts
│   │   │   ├── order.model.ts
│   │   │   ├── order.route.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── order.validation.ts
│   │   │   └── order.service.ts
├── .env
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

### Step 4: Set Up Express Server

In `src/app.ts`, write basic server code to test the application:

```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Application routes

// for Products Routs
app.use('/api/products', productsRoutes);
// For Orders Routs
app.use('/api/orders', OrderRouts);
// parser End

// Health Check
app.get('/', (req, res) => {
  res.send('Bike Store Server is running');
});

export default app;
```

---

### Step 5: Configure MongoDB and Environment Variables

In `src/server.ts`, connect to MongoDB using Mongoose and start the server:

```typescript
import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';
import Config from './App/Config';

async function main() {
  try {
    await mongoose.connect(Config.dataBaseUrl as string);

    app.listen(Config.port, () => {
      console.log(`Bike Store Server Is Running On Port => ${Config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
```

Add environment variables in a `.env` file:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/bikestore
```

Centralize environment variables in `src/config/index.ts`:

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || '',
};
```

---

### Step 6: Software Design Pattern

The project uses a **modular design pattern** for scalability and clean code. Each module contains:

1. **Interface**: TypeScript types and interfaces.
2. **Schema & Model**: Mongoose schema and model definitions.
3. **Routes**: Define API endpoints for the module.
4. **Controller**: Handle request and response logic.
5. **Service**: Business logic and database operations.
6. **Validation**: Input validation using Zod.

#### Request-Response Flow

```
Client ---> Route ---> Controller ---> Service ---> Database
```

or

```
 client ---(Req)----> route.ts ----(Req)---> controller.ts ---(Req)---> <---(Res)--- service.ts ---(Req)--- >< ---(Res)--- DB
```

---

### Step 7: Example Module (Product)

The following is an example of creating and integrating a **Product** module:

#### 1. Define Interface (`product.interface.ts`)

Define types for the product module.

```typescript
export interface IProduct {
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}
```

#### 2. Create Model (`product.model.ts`)

Define the Mongoose schema and model.

```typescript
import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
});

export const Product = model<IProduct>('Product', productSchema);
```

#### 3. Add Zod Validation (`product.validation.ts`)

```typescript
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().optional(),
  inStock: z.boolean().optional(),
});
```

#### 4. Implement Controller (`product.controller.ts`)

```typescript
import { Request, Response } from 'express';
import { getProductsFromDb, createProductInDb } from './product.service';
import { productSchema } from './product.validation';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsFromDb();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const newProduct = await createProductInDb(validatedData);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.errors });
  }
};
```

#### 5. Create Routes (`product.route.ts`)

```typescript
import express from 'express';
import { getAllProducts, createProduct } from './product.controller';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);

export default router;
```

#### 6. Build Service (`product.service.ts`)

```typescript
import { Product } from './product.model';

export const getProductsFromDb = async () => {
  return await Product.find();
};

export const createProductInDb = async (data) => {
  return await Product.create(data);
};
```

---

### Step 8: Connect Module

Add the routes to `src/app.ts`:

```typescript
import productRoutes from './modules/product/product.route';

app.use('/api/products', productRoutes);
```

---

### Step 9: Run the Project

write scripts on `package.json`:

```package.json
"start:prod": "node ./dist/server.js",
"start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
"lint": "eslint src/**/*.ts",
"lint:fix": "eslint src/**/*.ts --fix",
```

---

### Step 9: Run the Project

Use `ts-node-dev` for live reload:

```bash
npm run start:dev
```

---

### By Following this Blog Anyone Can Create a Professional Backend Server
