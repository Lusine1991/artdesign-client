'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { RegisterSchema } from '@/entities/user/model/schemas';
import { z } from 'zod';

const RegisterFormSchema = RegisterSchema.extend({
  testPass: z.string(),
});
import { register } from '@/entities/user/model/thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZodError } from 'zod';
import type { RegisterT } from '@/entities/user/model/types';

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterT & { testPass: string }>({
    resolver: zodResolver(RegisterFormSchema),
  });

  useEffect(() => {
    setFormError('');
  }, []);

  const onSubmit = async (data: RegisterT & { testPass: string }) => {
    try {
      setIsLoading(true);
      setFormError('');

      if (data.password !== data.testPass) {
        setFormError('Пароли не совпадают');
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { testPass, ...registerData } = data;
      await dispatch(register(registerData)).unwrap();
      router.push('/main');
    } catch (err) {
      if (err instanceof ZodError) {
        setFormError(err.issues[0].message);
      } else if (typeof err === 'string') {
        setFormError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-field">
        <Input
          {...registerField('username')}
          placeholder="Логин"
          disabled={isLoading}
          className="form-input"
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
        {error === 'Пользователь с таким логином уже есть' && !formError && (
          <p className="text-sm text-destructive">
            ❌ Пользователь с таким логином уже существует
          </p>
        )}
      </div>

      <div className="form-field">
        <Input
          {...registerField('email')}
          type="email"
          placeholder="Email"
          disabled={isLoading}
          className="form-input"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
        {error === 'Пользователь с таким email уже есть' && !formError && (
          <p className="text-sm text-destructive">
            ❌ Пользователь с таким email уже существует
          </p>
        )}
      </div>

      <div className="form-field">
        <Input
          {...registerField('password')}
          type="password"
          placeholder="Пароль"
          disabled={isLoading}
          className="form-input"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="form-field">
        <Input
          {...registerField('testPass')}
          type="password"
          placeholder="Подтверждение пароля"
          disabled={isLoading}
          className="form-input"
        />
      </div>

      {formError && (
        <div className="text-sm text-destructive">❌ {formError}</div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full btn-primary">
        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}
