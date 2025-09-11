import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../api/ChatService";
import { NewChatT } from "./types";


export const addMessage = createAsyncThunk('message/addmessage', async (data: NewChatT) => {
    // console.log(data)
    const response = await ChatService.addMessage(data)
    return response
})