
import axiosInstanceWebSocket from "@/shared/api/axiosInstanceWebSocket/axiosInstanceWebSocket";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMessageUser = createAsyncThunk('message/getMessageUser', async () => {
    const response = await axiosInstanceWebSocket.get('/message/user')
    return response.data
})