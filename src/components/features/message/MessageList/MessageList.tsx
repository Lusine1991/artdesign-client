// client/src/components/features/message/MessageList/MessageList.tsx
"use client";

import React, { useEffect } from "react";
import MessageCard from "../MessageCard/MessageCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAdminChat, getMessagesUser } from "@/entities/user/model/thunks";
import { setSelectedUser } from "@/entities/user/model/slice";

export default function MessageList(): React.JSX.Element {
  const user = useAppSelector((store) => store.user.user);
  const selectedUserId = useAppSelector((store) => store.user.selectedUserId);
  const status = useAppSelector((store) => store.user.status);
  const dispatch = useAppDispatch();

  const isAdminView = user?.isAdmin && status === "admin";

  // Восстанавливаем выбранный чат
  useEffect(() => {
    if (
      isAdminView &&
      (selectedUserId === null || selectedUserId === undefined)
    ) {
      const savedUserId = localStorage.getItem("adminSelectedUserId");
      if (savedUserId) {
        console.log("=== RESTORING ===", savedUserId);
        dispatch(setSelectedUser(parseInt(savedUserId)));
      }
    }
  }, [isAdminView, selectedUserId, dispatch]);

  // Сохраняем выбранный чат
  useEffect(() => {
    if (selectedUserId) {
      localStorage.setItem("adminSelectedUserId", selectedUserId.toString());
    }
  }, [selectedUserId]);

  // Очищаем при выходе из админ-режима
  useEffect(() => {
    return () => {
      if (!isAdminView) {
        localStorage.removeItem("adminSelectedUserId");
      }
    };
  }, [isAdminView]);

  // Загружаем сообщения
  useEffect(() => {
    if (user) {
      if (isAdminView && selectedUserId) {
        console.log("=== ADMIN LOADING CHAT ===", selectedUserId);
        dispatch(getAdminChat(selectedUserId));
      } else {
        console.log("=== USER LOADING MESSAGES ===");
        dispatch(getMessagesUser());
      }
    }
  }, [user, isAdminView, selectedUserId, dispatch]);

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="container-messagecard">
      <div className="map">
        <MessageCard />
      </div>
    </div>
  );
}
