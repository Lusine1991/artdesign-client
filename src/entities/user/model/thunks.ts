import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../api/UserService";
import type {
  ChangePasswordT,
  ChangeProfileT,
  LoginT,
  RegisterT,
  UserT,
} from "./types";
import { AxiosError } from "axios";
import { ErrorSchema } from "./schemas";

export const register = createAsyncThunk<
  UserT,
  RegisterT,
  { rejectValue: string }
>("user/signup", async (data: RegisterT, { rejectWithValue }) => {
  try {
    const user = await UserService.signup(data);
    
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = ErrorSchema.parse(error.response?.data);
      return rejectWithValue(errorData.message);
    }
    return rejectWithValue("Error");
  }
});

export const login = createAsyncThunk<UserT, LoginT, { rejectValue: string }>(
  "user/signin",
  async (data: LoginT, { rejectWithValue }) => {
    try {
      const user = await UserService.signin(data);
      
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorData = ErrorSchema.parse(error.response?.data);
        return rejectWithValue(errorData.message);
      }
      return rejectWithValue("Error");
    }
  }
);

export const refresh = createAsyncThunk<
  UserT,
  undefined,
  { rejectValue: string }
>("user/refresh", async (_, { rejectWithValue }) => {
  try {
    const user = await UserService.refresh();
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = ErrorSchema.parse(error.response?.data);
      return rejectWithValue(errorData.message);
    }
    return rejectWithValue("Error");
  }
});

export const logout = createAsyncThunk<
  string,
  undefined,
  { rejectValue: string }
>("user/logout", (_, { rejectWithValue }) => {
  try {
    void UserService.logout();
    return "Success";
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = ErrorSchema.parse(error.response?.data);
      return rejectWithValue(errorData.message);
    }
    return rejectWithValue("Error");
  }
});

export const changePassword = createAsyncThunk<
  UserT,
  ChangePasswordT,
  { rejectValue: string }
>("user/changePassword", async (data: ChangePasswordT, { rejectWithValue }) => {
  try {
    const user = await UserService.changePassword(data);
    
    return user;
  } catch (error) {
    console.log(error, "222222222");
    if (error instanceof AxiosError) {
      const errorData = ErrorSchema.parse(error.response?.data);
      return rejectWithValue(errorData.message);
    }
    return rejectWithValue("error");
  }
});

export const changeProfile = createAsyncThunk<
  UserT,
  ChangeProfileT | FormData,
  { rejectValue: string }
>(
  "user/changeProfile",
  async (data: ChangeProfileT | FormData, { rejectWithValue }) => {
    try {
      const user = await UserService.changeProfile(data);
      
      return user;
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        const errorData = ErrorSchema.parse(error.response?.data);
        return rejectWithValue(errorData.message);
      }
      return rejectWithValue("Error");
    }
  }
);

export const allUsers = createAsyncThunk('user/allusers', () => UserService.allUser())
// console.log(allUsers)

export const userByPk = createAsyncThunk('user/oneuser', (userId: UserT['id']) => {
  // console.log('=== REDUX THUNK userByPk ===', userId);
  const data = UserService.oneUser(userId)
  // console.log('=== REDUX THUNK RESULT ===', data);
  return data
} )

export const getMessagesUser = createAsyncThunk('message/getMessageUser', async () => {
    return await UserService.getMessagesUser()
})

export const getAdminChat = createAsyncThunk('user/getAdminChat', async (userId: number) => {
  const response = await UserService.getAdminChat(userId)
  console.log(response,'санка')
  return response
})