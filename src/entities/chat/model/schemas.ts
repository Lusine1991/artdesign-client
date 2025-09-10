import z from 'zod'

export const ChatSchemas = z.object({
    id: z.number(),
    content: z.string(),
    userId: z.number(),
    chatId: z.number(),
})


export const NewChatSchema = z.object({
    content: z.string(),
    chatId: z.number()
})