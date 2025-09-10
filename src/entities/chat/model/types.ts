import z from 'zod'
import { ChatSchemas, NewChatSchema } from './schemas'

export type ChatT = z.infer<typeof ChatSchemas>
export type NewChatT = z.infer<typeof NewChatSchema>