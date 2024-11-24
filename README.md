# Professional Backend Project For BikeStoreServer

This guide outlines how to set up a professional backend project using TypeScript, Express, Mongoose, and other essential tools. It also follows a **modular design pattern** for clean and maintainable code.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (latest stable version)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **TypeScript** as a development dependency

---

## Steps to Set Up the Project

### Step 1: Install Dependencies

Run the following commands to install required packages:

```bash
# Install runtime dependencies
npm install express mongoose dotenv cors

# Install TypeScript and development dependencies
npm install -D typescript ts-node-dev @types/node @types/express eslint prettier
```

### Step 2: Initialize TypeScript

Run the following command to generate a TypeScript configuration file:

```bash
tsc --init
```

Modify `tsconfig.json` to include the `src` folder as the root directory and specify an output directory for compiled files:

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

### Step 3: Project Folder Structure

Create the following folder structure:

```
project-root/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── index.ts
│   ├── modules/
│   │   └── product/
│   │       ├── product.interface.ts
│   │       ├── product.model.ts
│   │       ├── product.route.ts
│   │       ├── product.controller.ts
│   │       └── product.service.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## Implementation Steps

### Step 4: Set Up Express Server

In `src/app.ts`, write basic Express server code to test:

```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
```

### Step 5: Configure MongoDB with Mongoose

Move the main server code to `src/server.ts` and connect MongoDB using Mongoose:

```typescript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;

async function bootstrap() {
  try {
    await mongoose.connect(databaseUrl || '');
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

bootstrap();
```

### Step 6: Environment Configuration

Create a `.env` file in the project root:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/my_database
```

Create a config file `src/config/index.ts` to centralize environment variables:

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

## Modular Design Pattern

The project follows a **modular design pattern** for scalability and maintainability.

### File Organization

1. **Interface (`product.interface.ts`)**: Define TypeScript types and interfaces for the module.
2. **Schema & Model (`product.model.ts`)**: Define the Mongoose schema and model using the interfaces.
3. **Route (`product.route.ts`)**: Handle incoming requests for this module.
4. **Controller (`product.controller.ts`)**: Process requests and responses for the module.
5. **Service (`product.service.ts`)**: Handle business logic and communicate with the database.

### Request-Response Flow

```
Client → Route → Controller → Service → Database → Response
```

---

### Step 7: Example: Product Module

#### 1. Create an Interface (`product.interface.ts`)

```typescript
export interface IProduct {
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}
```

#### 2. Create a Model (`product.model.ts`)

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

#### 3. Define Routes (`product.route.ts`)

```typescript
import express from 'express';
import { getAllProducts } from './product.controller';

const router = express.Router();

router.get('/', getAllProducts);

export default router;
```

#### 4. Write Controller (`product.controller.ts`)

```typescript
import { Request, Response } from 'express';
import { getProductsFromDb } from './product.service';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsFromDb();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

#### 5. Create Service (`product.service.ts`)

```typescript
import { Product } from './product.model';

export const getProductsFromDb = async () => {
  return await Product.find();
};
```

---

### Step 8: Connect Module to App

Import and use the module's routes in `app.ts`:

```typescript
import productRoutes from './modules/product/product.route';

app.use('/api/products', productRoutes);
```

---

## Additional Setup

### ESLint and Prettier

1. Install dependencies:

   ```bash
   npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
   ```

2. Create `.eslintrc.json`:

   ```json
   {
     "env": {
       "browser": true,
       "es2021": true
     },
     "extends": ["eslint:recommended", "plugin:prettier/recommended"],
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint", "prettier"],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

3. Add a Prettier config (`.prettierrc`):

   ```json
   {
     "singleQuote": true,
     "semi": false
   }
   ```

---

### Run the Project

Use `ts-node-dev` for live reload:

```bash
npx ts-node-dev src/server.ts
```

---

## Summary

This setup provides a clean, modular structure for developing scalable backend applications using TypeScript, Express, and Mongoose. By following the interface-schema-model pattern, you ensure type safety and maintainable code.

---
