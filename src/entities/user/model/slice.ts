import { createSlice } from "@reduxjs/toolkit";
import type { UserStateT, UserT } from "./types";
import {
  allUsers,
  changePassword,
  changeProfile,
  login,
  logout,
  refresh,
  register,
  userByPk,
} from "./thunks";


const initialState: UserStateT = {
  user: null,
  status: "loading",
  error: null,
  users: [],
  currentUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "logged";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "guest";
        state.error = action.payload ?? "Error";
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user.isAdmin) {
          state.status = "admin";
        } else {
          state.status = "logged";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "guest";
        state.error = action.payload ?? "Error";
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      });

    builder
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user.isAdmin) {
          state.status = "admin";
        } else {
          state.status = "logged";
        }
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "guest";
        state.error = action.payload ?? "Error";
      })
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });

    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "guest";
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload ?? "Error";
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
      });

    builder
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload ?? "Error";
      });

    builder
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changeProfile.rejected, (state, action) => {
        state.error = action.payload ?? "Error";
      });
      
      builder
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload as unknown as UserT[]
        // console.log(state.users)
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка загрузки пользователей";
      })
      .addCase(allUsers.pending, (state) => {
        state.error = null;
      });

      builder
      .addCase(userByPk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null
      })
      .addCase(userByPk.pending, (state) => {
        state.error = null
      })
      .addCase(userByPk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка загрузки пользователя';
        state.currentUser = null
      })
  },
});
