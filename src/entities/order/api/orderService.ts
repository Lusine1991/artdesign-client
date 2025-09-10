import type {
  OrderT,
  CreateOrderT,
  OrderAdminT,
  UpdateOrderT,
} from "../model/types";
import { OrderAdminSchema, OrderSchema } from "../model/schemas";
import axiosInstance from "@/shared/api/axiosInstance";

class OrderService {
  static async createOrder(orderData: CreateOrderT): Promise<OrderT> {
    const response = await axiosInstance.post("/order/user", orderData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return OrderSchema.parse(response.data);
  }

  static async getUserOrders(): Promise<OrderT[]> {
    const response = await axiosInstance.get("/order/user");
    return OrderSchema.array().parse(response.data);
  }

  static async getAdminOrders(): Promise<OrderAdminT[]> {
    const response = await axiosInstance.get("/order/admin");
    return OrderAdminSchema.array().parse(response.data);
  }

  static async updateOrder(
    orderId: number,
    orderData: UpdateOrderT
  ): Promise<OrderT> {
    const response = await axiosInstance.put(
      `/order/admin/${orderId}`,
      orderData
    );
    return OrderAdminSchema.parse(response.data);
  }

  static async updateStatus(orderId: number, status: string): Promise<OrderT> {
    const response = await axiosInstance.put(`/order/user/${orderId}`, {
      status,
    });
    return OrderSchema.parse(response.data);
  }
}

export default OrderService;
