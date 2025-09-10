import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../api/ChatService";
import { NewChatT } from "./types";
import { NewChatSchema } from "./schemas";

export const addMessage = createAsyncThunk('message/addmessage', async (data: NewChatT) => {
    const response = await ChatService.addMessage(data)
    return NewChatSchema.array().parse(response)
})