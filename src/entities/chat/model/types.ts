import z from 'zod'
import { ChatSchemas, NewChatSchema } from './schemas'

export type ChatT = z.infer<typeof ChatSchemas>
export type NewChatT = z.infer<typeof NewChatSchema>

export type ChatContextT = {
    sendMessage: (data: string | object) => void;
    connect: () => void
}

export type WebSocketMessage = ChatT & {
    type: string;
    user?: {
        id: number;
        username: string;
        isAdmin: boolean;
    }
}

export interface ChatState {
  activeUsers: ChatUserT[];
  messages: MessageT[];
}

export interface ChatUserT {
  id: number;
  username: string;
}

export interface MessageT {
  id: number;
  content: string;
  userId: number;
  chatId: number;
  recipientId?: number;
  isAdminMessage?: boolean;
  createdAt?: string;
  updatedAt?: string;
}