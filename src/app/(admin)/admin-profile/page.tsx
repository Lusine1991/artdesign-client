'use client';

import OrderAdminList from '@/components/features/orders/OrderList/OrderAdminList';
import { ProfileForm } from '@/components/forms/profile-form';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { getAdminOrders } from '@/entities/order/model/thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';

export default function AdminProfilePage(): React.JSX.Element {
  const { status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  if (status === 'loading' || status === 'logged') {
    return (
      <ProtectedRoute requireAdmin={true}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="page-container">
        <div className="page-content">
          <div className="grid-1">
            <div className="section-card">
              <h2 className="page-title">Профиль администратора</h2>
              <ProfileForm />
            </div>

            <div className="section-card">
              <h2 className="page-title">Все заказы</h2>
              <OrderAdminList />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
