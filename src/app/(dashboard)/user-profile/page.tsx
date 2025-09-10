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
      <div className="page-content">
        <div className="section-card">
          <ProfileForm />
        </div>

        <div className="flex flex-row space-y-8 mt-8">
          <div className="section-card w-3/5">
            <h2 className="section-title">Ваши заказы</h2>
            <OrderList />
          </div>
          <div className="section-card w-2/5">
            <h2 className="section-title">Сообщения</h2>
            <MessageList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
