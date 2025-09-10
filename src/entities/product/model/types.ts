import z from 'zod';
import { ProductSchema } from './schemas';

export type ProductT = z.infer<typeof ProductSchema>;

export type ProductStateT = {
  products: ProductT[];
  status: 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type CreateProductT = {
  type: string;
  color: string;
  size: string;
  print: File;
  image: File;
  description: string;
  price: number;
  isPublic: boolean;
}

export type UpdateProductT = {
  id: number;
  description: string;
  price: number;
  isPublic: boolean;
}