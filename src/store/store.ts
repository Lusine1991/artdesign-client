import { productSlice } from "@/entities/product/model/slice";
import { userSlice } from "@/entities/user/model/slice";
import { configureStore } from "@reduxjs/toolkit";
import aboutSlice  from "@/entities/about/model/slice";
import orderReducer  from "@/entities/order/model/slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    about: aboutSlice,
    order: orderReducer, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

