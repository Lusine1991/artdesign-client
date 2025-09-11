import z from 'zod'

export const ChatSchemas = z.object({
    id: z.number(),
    content: z.string(),
    userId: z.number(),
    chatId: z.number(),
    recipientId: z.number().optional(), // ID получателя (для админа)
    isAdminMessage: z.boolean().optional(), // Флаг сообщения от админа
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})


export const NewChatSchema = z.object({
    content: z.string(),
    chatId: z.number(),
    recipientId: z.number().optional(), // Для админа: кому отправляем
    isAdminMessage: z.boolean().optional() // Флаг админского сообщения
})