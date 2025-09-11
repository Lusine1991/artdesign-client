import z from 'zod'
import { MessageSchema } from './schemas'

export type MessageT = z.infer<typeof MessageSchema>


