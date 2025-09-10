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
      {/* <div className="flex items-center mb-4">
        <span className="text-lg mr-2">🔒</span>
        <h3 className="text-lg font-semibold">Изменение пароля</h3>
      </div> */}

      {!isEditing ? (
        <div className="space-y-4">
          {/* <p className="text-sm text-gray-600">
            Нажмите кнопку ниже, чтобы изменить пароль
          </p> */}
          <Button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: 'black',
              color: 'hsl(43 96% 90%)',
              border: '1px solid hsl(43 96% 90%)',
            }}
          >
            Изменить пароль
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Текущий пароль
            </label>
            <Input
              {...register('oldPassword')}
              type="password"
              placeholder="Введите текущий пароль"
              disabled={isLoading}
            />
            {errors.oldPassword && (
              <p className="text-sm text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Новый пароль
            </label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Введите новый пароль"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && <div className="text-sm text-red-500">❌ {error}</div>}

          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: 'black',
                color: 'hsl(43 96% 90%)',
                border: '1px solid hsl(43 96% 90%)',
              }}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              style={{
                backgroundColor: 'black',
                color: 'hsl(43 96% 90%)',
                border: '1px solid hsl(43 96% 90%)',
              }}
            >
              Отмена
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
