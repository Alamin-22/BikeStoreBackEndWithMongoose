export type BikeCategory = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';

// create an interface / type for Product
export interface TProduct {
  name: string;
  brand: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
