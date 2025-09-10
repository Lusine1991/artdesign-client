import z from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  photo: z.string(),
  name: z.string(),
  isAdmin: z.boolean(),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email("Неверный формат email")
    .max(99, "email не должен превышать 99 символов"),
  password: z
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(99, "Пароль не должен превышать 99 символов"),
  username: z
    .string()
    .min(3, "Логин должен быть не менее 3 символов")
    .max(99, "Имя не должно превышать 99 символов"),
});

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  accessToken: z.string().optional(),
  user: UserSchema,
});

export const ErrorSchema = z.object({
  message: z.string(),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string(),
  password: z
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(99, "Пароль не должен превышать 99 символов"),
});

export const ChangeProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Логин должен быть не менее 3 символов")
    .max(99, "Логин не должен превышать 99 символов"),
  name: z
    .string()
    .min(2, "Имя должно быть не менее 2 символов")
    .max(99, "Имя не должно превышать 99 символов"),
  photo: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    )
    .optional(),
});

export const ChangeProfileFormSchema = z.object({
  username: z
    .string()
    .min(3, "Логин должен быть не менее 3 символов")
    .max(99, "Логин не должен превышать 99 символов"),
  name: z
    .string()
    .min(2, "Имя должно быть не менее 2 символов")
    .max(99, "Имя не должно превышать 99 символов"),
});
