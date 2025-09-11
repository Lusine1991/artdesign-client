import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserStateT, UserT } from "./types";
import type { MessageT } from "@/entities/message/model/types";
import {
  allUsers,
  changePassword,
  changeProfile,
  getAdminChat,
  getMessagesUser,
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
  currentUser: null,
  selectedUserId: null,
  unreadMessages: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
      // Сбрасываем уведомления при выборе пользователя
      if (action.payload) {
        state.unreadMessages[action.payload] = 0;
      }
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    },
    addWebSocketMessage: (state, action: PayloadAction<MessageT>) => {
      if (state.currentUser) {
        state.currentUser.messages?.push(action.payload);
      }
    },
    incrementUnreadMessage: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.unreadMessages[userId] = (state.unreadMessages[userId] || 0) + 1;
    },
    resetUnreadMessages: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.unreadMessages[userId] = 0;
    },
    resetAllUnreadMessages: (state) => {
      state.unreadMessages = {};
    },
  },
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
        state.users = action.payload as unknown as UserT[];
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
        state.error = null;
      })
      .addCase(userByPk.pending, (state) => {
        state.error = null
      })
      .addCase(userByPk.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка загрузки пользователя";
        state.currentUser = null;
      });

    builder
      .addCase(getMessagesUser.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.messages = action.payload;
        } else {
          // Если currentUser не существует, создаем его с сообщениями
          state.currentUser = {
            id: state.user?.id || 0,
            email: state.user?.email || "",
            username: state.user?.username || "",
            photo: state.user?.photo || "",
            name: state.user?.name || "",
            isAdmin: state.user?.isAdmin || false,
            messages: action.payload,
            chats: [],
          };
        }
      })
      .addCase(getMessagesUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка загрузки сообщений";
      })
      .addCase(getMessagesUser.pending, (state) => {
        state.error = null;
      });

    builder
      .addCase(getAdminChat.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.messages = action.payload;
        }
      })
      .addCase(getAdminChat.rejected, (state, action) => {
        state.error = action.error.message ?? "Ошибка загрузки чата";
      })
      .addCase(getAdminChat.pending, (state) => {
        state.error = null;
      });

  },
});

export const { setSelectedUser, clearSelectedUser, addWebSocketMessage,
  incrementUnreadMessage, 
  resetUnreadMessages,    
  resetAllUnreadMessages
 } = userSlice.actions;
