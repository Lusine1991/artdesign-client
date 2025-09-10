import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getProducts, updateProduct } from "./thunks";
import { ProductStateT } from "./types";

const initialState: ProductStateT = {
  products: [],
  status: "loading",
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetch products";
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error create product";
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error update product";
      });
  },
});

// export const { } = productSlice.actions;

export const productReducer = productSlice.reducer;
