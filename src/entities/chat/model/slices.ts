
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ChatState, ChatUserT } from './types';
import { MessageT } from '@/entities/user/model/types';

const initialState: ChatState = {
  activeUsers: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageT>) {
      state.messages.push(action.payload);
    },

    addUser(state, action: PayloadAction<ChatUserT>) {
      state.activeUsers.push(action.payload);
    },

    deleteUser(state, action: PayloadAction<number>) {
      state.activeUsers = state.activeUsers.filter((user) => user.id !== action.payload);
    },
  },
});

export default chatSlice.reducer;

export const { addMessage, addUser, deleteUser } = chatSlice.actions;