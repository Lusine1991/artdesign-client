'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/entities/user/model/schemas';
import { login } from '@/entities/user/model/thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { LoginT } from '@/entities/user/model/types';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginT>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginT) => {
    try {
      setIsLoading(true);
      await dispatch(login(data)).unwrap();
      router.push('/main');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-field">
        <Input
          {...register('email')}
          placeholder="Email или Логин"
          disabled={isLoading}
          className="form-input"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="form-field">
        <Input
          {...register('password')}
          type="password"
          placeholder="Пароль"
          disabled={isLoading}
          className="form-input"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {error && error === 'Неверные данные' && (
        <div className="text-sm text-destructive">
          ❌ Неверный email/логин или пароль
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full btn-primary">
        {isLoading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
}
