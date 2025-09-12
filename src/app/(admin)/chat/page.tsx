'use client';

import ChatList from '@/components/features/chat/ChatList/ChatList';
import MessageList from '@/components/features/message/MessageList/MessageList';
import { allUsers } from '@/entities/user/model/thunks';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';


import { ProtectedRoute } from '@/components/layout/protected-route';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

export default function ChatPage(): React.JSX.Element {
  const { status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(allUsers());
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
          <div className="page-header">
            <h1 className="page-title">Админ чат</h1>
            <p className="page-subtitle">
              Управление сообщениями и пользователями
            </p>
          </div>

          <div className="flex flex-row space-y-8 mt-8 gap-[20px] ">
            <div className="section-card w-2/5">
              <h2 className="page-title">Чаты</h2>
              <ChatList />
            </div>

            <div className="section-card w-3/5">
              <h2 className="page-title">Сообщения</h2>
              <MessageList />
            </div>

            {/* <div className="section-card">
              <h2 className="page-title">Пользователи</h2>
              <UserList />
            </div> */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
