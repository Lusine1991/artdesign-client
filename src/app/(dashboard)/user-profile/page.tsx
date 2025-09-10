'use client';

import React from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { ProfileForm } from '@/components/forms/profile-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { refresh } from '@/entities/user/model/thunks';

import OrderList from '@/components/features/orders/OrderList/OrderList';
import { getUserOrders } from '@/entities/order/model/thunks';
import MessageList from '@/components/features/message/MessageList/MessageList';

export default function AccountPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (status === 'loading' || status === 'admin') {
    return (
      <ProtectedRoute>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Профиль</h1>
            <p className="page-subtitle">
              Управление вашим аккаунтом и заказами
            </p>
          </div>

          <div className="grid-2">
            <div className="section-card">
              <h2 className="section-title">Личная информация</h2>
              <ProfileForm />
            </div>

            <div className="section-card">
              <h2 className="section-title">Ваши заказы</h2>
              <OrderList />
            </div>
          </div>

          <div className="section-card mt-8">
            <h2 className="section-title">Сообщения</h2>
            <MessageList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
