import z from 'zod'

export const MessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    userId: z.number(),
    chatId: z.number(),
    recipientId: z.number().nullable().optional(), // Добавляем
    isAdminMessage: z.boolean().optional(), // Добавляем
    createdAt: z.string().datetime().optional(), // Добавляем, если используется
    updatedAt: z.string().datetime().optional()
})