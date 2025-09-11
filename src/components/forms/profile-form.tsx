"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeProfileFormSchema } from "@/entities/user/model/schemas";
import { changeProfile } from "@/entities/user/model/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangePasswordForm } from "./change-password-form";

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
      username: user?.username || "",
      name: user?.name || "",
    },
  });

  const onSubmit = async (data: { username: string; name: string }) => {
    try {
      setIsLoading(true);
      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("name", data.name);
      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      await dispatch(changeProfile(formData as FormData)).unwrap();
      setIsEditing(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Profile update error:", error);
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
    <div className="flex flex-col justify-center bg-white p-6 rounded-lg ">
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex-shrink-0">
          {user.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              width={96}
              height={96}
              src={`${
                process.env.CLIENT_URL || "https://ArtDesignGevorgyans.mooo.com"
              }${user.photo}`}
              alt="Profile"
              className="rounded-full object-cover shadow-luxury"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-luxury">
              <span className="text-2xl text-primary-foreground">��</span>
            </div>
          )}
        </div>
        <div className="flex-grow pl-[20px]">
          <h2 className="text-2xl font-bold text-luxury mb-1">{user.name}</h2>
        </div>
      </div>

      {!isEditing ? (
        <div className="flex space-y-2 flex-row">
          <Button
            onClick={() => setIsEditing(true)}
            className="w-44 h-[20px] gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury"
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
            <label className="block text-sm font-medium text-foreground">
              Логин
            </label>
            <Input
              {...register("username")}
              disabled={isLoading}
              className="border-border focus:border-primary focus:ring-primary/20"
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Имя
            </label>
            <Input
              {...register("name")}
              disabled={isLoading}
              className="border-border focus:border-primary focus:ring-primary/20"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Фото
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="border-border focus:border-primary focus:ring-primary/20"
            />
            {selectedFile && (
              <p className="text-sm text-success">
                ✅ Выбран файл: {selectedFile.name}
              </p>
            )}
          </div>

          {error && <div className="text-sm text-destructive">❌ {error}</div>}

          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
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

      {/* Форма изменения пароля */}
    </div>
  );
}
