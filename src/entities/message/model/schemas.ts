import z from 'zod'

export const MessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    userId: z.number(),
    chatId: z.number()
})