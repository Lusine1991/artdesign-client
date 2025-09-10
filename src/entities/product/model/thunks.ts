import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../api/ProductService';
import { CreateProductT, UpdateProductT } from './types';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const products = await ProductService.getProducts();
  return products;
});

export const createProduct = createAsyncThunk('product/createProduct', async (data: CreateProductT) => {
  const product = await ProductService.createProduct(data);
  return product;
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (data: UpdateProductT) => {
  const product = await ProductService.updateProduct(data);
  return product;
})
