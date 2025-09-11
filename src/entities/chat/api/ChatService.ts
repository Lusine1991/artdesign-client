import { ChatT, NewChatT } from "../model/types";

import axiosInstanceWebSocket from "@/shared/api/axiosInstanceWebSocket/axiosInstanceWebSocket";

export class ChatService {
  static async addMessage(data: NewChatT): Promise<ChatT> {
    // console.log(data)
    const response = await axiosInstanceWebSocket.post("/message", data);
    return response.data;
  }
}
