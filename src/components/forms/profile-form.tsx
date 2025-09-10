'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeProfileFormSchema } from '@/entities/user/model/schemas';
import { changeProfile } from '@/entities/user/model/thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangePasswordForm } from './change-password-form';

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ username: string; name: string }>({
    resolver: zodResolver(ChangeProfileFormSchema),
    defaultValues: {
      username: user?.username || '',
      name: user?.name || '',
    },
  });

  const onSubmit = async (data: { username: string; name: string }) => {
    try {
      setIsLoading(true);
      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('name', data.name);
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      await dispatch(changeProfile(formData as FormData)).unwrap();
      setIsEditing(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex-shrink-0">
          {user.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={96}
              height={96}
              src={`http://localhost:3001${user.photo}`}
              alt="Profile"
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
        </div>
      </div>

      {!isEditing ? (
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: 'black',
              color: 'hsl(43 96% 90%)',
              border: '1px solid hsl(43 96% 90%)',
            }}
          >
            Редактировать профиль
          </Button>
          <div className="mt-8">
            <ChangePasswordForm />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Логин
            </label>
            <Input {...register('username')} disabled={isLoading} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <Input {...register('name')} disabled={isLoading} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Фото
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            {selectedFile && (
              <p className="text-sm text-green-600">
                ✅ Выбран файл: {selectedFile.name}
              </p>
            )}
          </div>

          {error && <div className="text-sm text-red-500">❌ {error}</div>}

          <div className="flex  space-x-2">
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: 'black',
                color: 'hsl(43 96% 90%)',
                border: '1px solid hsl(43 96% 90%)',
              }}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
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

      {/* Форма изменения пароля */}
    </div>
  );
}
