import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../api/orderService";
import type { CreateOrderT, UpdateOrderT } from "./types";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  (orderData: CreateOrderT) => OrderService.createOrder(orderData)
);

export const getUserOrders = createAsyncThunk("order/getUserOrders", () =>
  OrderService.getUserOrders()
);

export const getAdminOrders = createAsyncThunk("order/getAdminOrders", () =>
  OrderService.getAdminOrders()
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  ({ orderId, orderData }: { orderId: number; orderData: UpdateOrderT }) =>
    OrderService.updateOrder(orderId, orderData)
);

export const updateStatus = createAsyncThunk(
  "order/updateStatus",
  ({ orderId, status }: { orderId: number; status: string }) =>
    OrderService.updateStatus(orderId, status)
);
