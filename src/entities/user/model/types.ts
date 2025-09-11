import type z from "zod";
import type {
  AuthResponseSchema,
  ChangePasswordSchema,
  ChangeProfileSchema,
  ErrorSchema,
  LoginSchema,
  RegisterSchema,
  UserSchema,
} from "./schemas";
import type { ChatT } from "@/entities/chat/model/types";

export type UserT = z.infer<typeof UserSchema>;
export type RegisterT = z.infer<typeof RegisterSchema>;
export type LoginT = z.infer<typeof LoginSchema>;
export type AuthResponseT = z.infer<typeof AuthResponseSchema>;
export type ChangePasswordT = z.infer<typeof ChangePasswordSchema>;
export type ChangeProfileT = z.infer<typeof ChangeProfileSchema>;
export type ErrorT = z.infer<typeof ErrorSchema>;

export type MessageT = {
  id: number;
  content: string;
  userId: number;
  chatId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type UserWithRelationsT = {
  id: number;
  email: string;
  username: string;
  photo: string;
  name: string;
  isAdmin: boolean;
  messages?: MessageT[];
  chats?: ChatT[];
  createdAt?: string;
  updatedAt?: string;
};

export type UserStateT = {
  user: UserT | null;
  status: "guest" | "logged" | "loading" | "admin";
  error: string | null;
  users: UserWithRelationsT[];
  currentUser: UserWithRelationsT | null;
  selectedUserId: number | null;
};
