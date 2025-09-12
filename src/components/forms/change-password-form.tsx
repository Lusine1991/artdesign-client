'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '@/entities/user/model/schemas';
import { changePassword } from '@/entities/user/model/thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ChangePasswordT } from '@/entities/user/model/types';

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordT>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordT) => {
    try {
      setIsLoading(true);
      await dispatch(changePassword(data)).unwrap();
      setIsEditing(false);
      reset();
    } catch (error) {
      console.error('Password change error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="mt-6">
      {!isEditing ? (
        <div className="space-y-4">
          <Button
            onClick={() => setIsEditing(true)}
            className="w-44 h-[20px] gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury"
          >
            Изменить пароль
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block my-[15px] text-sm font-medium text-foreground">
              Текущий пароль
            </label>
            <Input
              {...register('oldPassword')}
              type="password"
              placeholder="Введите текущий пароль"
              disabled={isLoading}
              className="border-border focus:border-primary focus:ring-primary/20"
            />
            {errors.oldPassword && (
              <p className="text-sm text-destructive">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block my-[15px] text-sm font-medium text-foreground">
              Новый пароль
            </label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Введите новый пароль"
              disabled={isLoading}
              className="border-border focus:border-primary focus:ring-primary/20"
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && <div className="text-sm text-destructive">❌ {error}</div>}

          <div className="flex space-x-2 mt-[20px] gap-[20px]">
            <Button
              type="submit"
              disabled={isLoading}
              className="gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury"
            >
              Отмена
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
