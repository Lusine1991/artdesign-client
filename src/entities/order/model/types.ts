import z from "zod";
import { OrderAdminSchema, OrderSchema } from "./schemas";

export type OrderT = z.infer<typeof OrderSchema>;

export interface CreateOrderT {
  quantity: number;
  adress: string;
  phoneNumber: string;
  type: string;
  color: string;
  size: string;
  print: File;
  image: File;
  description: string;
  price: number;
  isPublic: boolean;
}

export interface UpdateOrderT {
  status: string;
  quantity: number;
  adress: string;
  phoneNumber: string;
}

export interface OrderStateT {
  adminOrders: OrderAdminT[];
  orders: OrderT[];
  adminOrdersFilter: OrderAdminT[];
  ordersFilter: OrderT[];
  error: string | null;
  loading: boolean;
}

export type OrderAdminT = z.infer<typeof OrderAdminSchema>;

export interface ConstructorDataT {
  type: string;
  color: string;
  size: string;
  print: string;
  price: number;
  description: string;
  isPublic: boolean;
  customPrint: string;
  customImage: string;
  filePrint: File | null;
  fileImage: File | null;
}