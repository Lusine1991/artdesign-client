import axios from "axios";
import type {
  ChangePasswordT,
  ChangeProfileT,
  LoginT,
  MessageT,
  RegisterT,
  
  UserT,
  UserWithRelationsT,
} from "../model/types";
import { AuthResponseSchema } from "../model/schemas";
import axiosInstance from "@/shared/api/axiosInstance";
import axiosInstanceWebSocket from "@/shared/api/axiosInstanceWebSocket/axiosInstanceWebSocket";

export class UserService {
  static async signup(user: RegisterT): Promise<UserT> {
    const response = await axios.post("/api/auth/signup", user);
    const { user: userData, accessToken } = AuthResponseSchema.parse(response.data);
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return userData;
  }

  static async signin(user: LoginT): Promise<UserT> {
    const response = await axios.post("/api/auth/signin", user);
    const { user: userData, accessToken } = AuthResponseSchema.parse(response.data);
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return userData;
  }

  static async refresh(): Promise<UserT> {
    const response = await axios.get("/api/auth/refresh");
    const { user: userData, accessToken } = AuthResponseSchema.parse(response.data);
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return userData;
  }

  static async changePassword(data: ChangePasswordT): Promise<UserT> {
    const response = await axiosInstance.post("/auth/changePassword", data);
    return AuthResponseSchema.parse(response.data).user;
  }

  static async changeProfile(user: FormData | ChangeProfileT): Promise<UserT> {
    console.log(user);
    const response = await axiosInstance.post("/auth/changeProfile", user, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    const { user: userData, accessToken } = AuthResponseSchema.parse(response.data);
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return userData;
  }

  static async logout(): Promise<string> {
    await axios.delete("/api/auth/logout");
    localStorage.removeItem('accessToken');
    return "Success";
  }

  static async allUser(): Promise<UserWithRelationsT[]> {
    const response = await axiosInstanceWebSocket.get('/auth/alluser')
    // console.log(response.data)
    return response.data
  }

  static async oneUser(userId: number):Promise<UserT> {
    // console.log('=== API CALL oneUser ===', userId);
    const response = await axiosInstanceWebSocket.get(`/auth/${userId}`)
    // console.log('=== API RESPONSE ===', response.data);
    return response.data
  }

  static async getAdminChat(userId: number): Promise<MessageT[]> {
  const response = await axiosInstanceWebSocket.get(`/message/admin/${userId}`)
  console.log(response.data,'------------------------------')
  return response.data
}

static async getMessagesUser(): Promise<MessageT[]> {
    const response = await axiosInstanceWebSocket.get('/message/user')
    return response.data
  }
}
