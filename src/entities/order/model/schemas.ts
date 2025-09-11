import z from 'zod';

export const OrderSchema = z.object({
  id: z.number(),
  goodId: z.number(),
  status: z.string(),
  adress: z.string(),
  quantity: z.number(),
  userId: z.number(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Good: z.object({
    id: z.number(),
    type: z.string(),
    color: z.string(),
    size: z.string(),
    print: z.string(),
    image: z.string(),
    description: z.string(),
    price: z.number(),
    isPublic: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const OrderAdminSchema = z.object({
  id: z.number(),
  goodId: z.number(),
  status: z.string(),
  adress: z.string(),
  quantity: z.number(),
  userId: z.number(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  User: z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  Good: z.object({
    id: z.number(),
    type: z.string(),
    color: z.string(),
    size: z.string(),
    print: z.string(),
    image: z.string(),
    description: z.string(),
    price: z.number(),
    isPublic: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const CreateOrderSchema = z.object({
  goodId: z.number().min(1, 'Выберите товар'),
  quantity: z.number().min(1, 'Количество должно быть больше 0'),
  adress: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
  phoneNumber: z.string().regex(/^(\+[1-9])[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, 'Некорректный номер телефона'),
});

export const UpdateOrderSchema = z.object({
  status: z.string().min(1, 'Статус должен быть больше 0'),
  quantity: z.number().min(1, 'Количество должно быть больше 0'),
  adress: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
  phoneNumber: z.string().min(9, 'Некорректный номер телефона'),
});

export const UpdateStatusSchema = z.object({
  status: z.string().min(1, 'Статус должен быть больше 0'),
});