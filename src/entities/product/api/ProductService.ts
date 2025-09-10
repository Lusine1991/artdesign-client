import axiosInstance from "@/shared/api/axiosInstance";
import { CreateProductT, ProductT, UpdateProductT } from "../model/types";
import { ProductSchema } from "../model/schemas";

class ProductService {
  static async getProducts(): Promise<ProductT[]> {
    const response = await axiosInstance.get("/good");
    return ProductSchema.array().parse(response.data);
  }

  static async createProduct(data: CreateProductT): Promise<ProductT> {
    const response = await axiosInstance.post("/good", data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return ProductSchema.parse(response.data);
  }

  static async updateProduct(data: UpdateProductT): Promise<ProductT> {
    const response = await axiosInstance.put(`/good/admin/${data.id}`, data);
    return ProductSchema.parse(response.data);
  }
}

export default ProductService;
