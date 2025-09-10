import { createSlice } from "@reduxjs/toolkit";
import { OrderStateT } from "./types";
import {
  createOrder,
  getAdminOrders,
  getUserOrders,
  updateOrder,
  updateStatus,
} from "./thunks";

const initialState: OrderStateT = {
  adminOrders: [],
  orders: [],
  adminOrdersFilter: [],
  ordersFilter: [],
  error: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    filterOrders: (state, action) => {
      switch (action.payload) {
        case "all":
          state.ordersFilter = state.orders;
          state.adminOrdersFilter = state.adminOrders;
          break;
        case "pending":
          state.ordersFilter = state.orders.filter(
            (order) => order.status === "Ожидает подтверждения"
          );
          state.adminOrdersFilter = state.adminOrders.filter(
            (order) => order.status === "Ожидает подтверждения"
          );
          break;
        case "processing":
          state.ordersFilter = state.orders.filter(
            (order) => order.status === "В работе"
          );
          state.adminOrdersFilter = state.adminOrders.filter(
            (order) => order.status === "В работе"
          );
          break;
        case "completed":
          state.ordersFilter = state.orders.filter(
            (order) => order.status === "Завершён"
          );
          state.adminOrdersFilter = state.adminOrders.filter(
            (order) => order.status === "Завершён"
          );
          break;
        case "cancelled":
          state.ordersFilter = state.orders.filter(
            (order) => order.status === "Отменён"
          );
          state.adminOrdersFilter = state.adminOrders.filter(
            (order) => order.status === "Отменён"
          );
          break;
        default:
          state.ordersFilter = state.orders;
          state.adminOrders = state.adminOrders;
          break;
      }
    },
    sortOrders: (state, action) => {
      switch (action.payload) {
        case "price":
          state.ordersFilter.sort(
            (a, b) => a.quantity * a.Good.price - b.quantity * b.Good.price
          );
          state.adminOrdersFilter.sort(
            (a, b) => a.quantity * a.Good.price - b.quantity * b.Good.price
          );
          break;
        case "quantity":
          state.ordersFilter.sort((a, b) => a.quantity - b.quantity);
          state.adminOrdersFilter.sort((a, b) => a.quantity - b.quantity);
          break;
        case "date":
          state.ordersFilter.sort((a, b) => a.id - b.id);
          state.adminOrdersFilter.sort((a, b) => a.id - b.id);
          break;
        default:
          break;
      }
    },
  },
  extraReducers(builder) {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.ordersFilter.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при создании заказа";
        state.loading = false;
      });
    // Get User Orders
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersFilter = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при загрузке заказов";
        state.loading = false;
      });
    // Update Order
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.adminOrders.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.ordersFilter.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.adminOrdersFilter.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при обновлении заказа";
        state.loading = false;
      });
    // Update Status
    builder
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.orders.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
          }
        });
        state.adminOrders.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
          }
        });
        state.ordersFilter.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.adminOrdersFilter.map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            order.adress = action.payload.adress;
            order.quantity = action.payload.quantity;
            order.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при обновлении заказа";
        state.loading = false;
      });
    // Get Admin Orders
    builder
      .addCase(getAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.adminOrders = action.payload;
        state.adminOrdersFilter = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка при загрузке заказов";
        state.loading = false;
      });
  },
});

export const { clearError, filterOrders, sortOrders } = orderSlice.actions;
export default orderSlice.reducer;
