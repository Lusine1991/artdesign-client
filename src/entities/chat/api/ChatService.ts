
import { ChatT, NewChatT } from "../model/types";
import axiosInstance from "@/shared/api/axiosInstance";

export class ChatService { 

    static async addMessage(data: NewChatT):Promise<ChatT> {
        const response = await axiosInstance.post('/message', data)
        return response.data
    }
}