import type { MessageT } from "@/entities/message/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./MessageCard.module.css";
import { NewChatT } from "@/entities/chat/model/types";
import { addMessage } from "@/entities/chat/model/thanks";
import { useChat } from "@/entities/chat/model/chatContext";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const showToast = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
  const backgroundColor = type === 'error' ? '#ff4444' : 
                         type === 'success' ? '#00c851' : '#ffbb33';
  
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: backgroundColor,
    stopOnFocus: true,
  }).showToast();
};

export default function MessageCard(): React.JSX.Element {
  const { connect, sendMessage } = useChat();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((store) => store.user.currentUser);
  const user = useAppSelector((store) => store.user.user);
  const selectedUserId = useAppSelector((store) => store.user.selectedUserId);
  // console.log(selectedUserId);
  const status = useAppSelector((store) => store.user.status);

  const messages = currentUser?.messages || [];

  const isLoading = !currentUser?.messages || currentUser.messages.length === 0;
  // const chats = currentUser?.chats || [];

  useEffect(() => {
    if (user) {
      connect();
    }
  }, [user, connect]);

  const [formData, setFormData] = useState<NewChatT>({
    content: '',
    chatId: currentUser?.id || 1,
    recipientId: selectedUserId || undefined,
    isAdminMessage: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      recipientId: selectedUserId || undefined,
    }));
  }, [selectedUserId]);

  if (!currentUser) {
    return (
      <div className="text-center text-muted-foreground p-8">
        Пользователь не найден
      </div>
    );
  }

  const isAdmin = currentUser.isAdmin;
  const isAdminView = isAdmin && status === 'admin';

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      showToast("Сообщение не может быть пустым", "error");
      return;
    }

    let messageToSend: NewChatT;

    // ДОБАВИТЬ ЭТУ ЛОГИКУ:
    if (isAdmin && isAdminView && selectedUserId) {
      messageToSend = {
        ...formData,
        chatId: selectedUserId,
        recipientId: selectedUserId,
        isAdminMessage: true,
      };
    } else {
      messageToSend = {
        ...formData,
        chatId: currentUser.id,
        recipientId: 0,
        isAdminMessage: false,
      };
    }

    // HTTP запрос для сохранения в БД
    dispatch(addMessage(messageToSend))
      .unwrap()
      .then(() => {
        // WebSocket уведомление после успешного сохранения
        sendMessage(
          JSON.stringify({
            type: 'newMessage',
            chatId: messageToSend.chatId,
            userId: currentUser.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        
      });

    setFormData((prev) => ({
      ...prev,
      content: '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const displayMessages =
    isAdminView && selectedUserId
      ? messages.filter(
          (msg) =>
            (msg.userId === 1 && msg.chatId === selectedUserId) ||
            (msg.userId === selectedUserId && msg.chatId === selectedUserId)
        )
      : messages.filter(
          (msg) =>
            (msg.userId === currentUser.id && msg.chatId === currentUser.id) ||
            (msg.userId === 1 && msg.chatId === currentUser.id)
        );

  // Функция для определения, кто отправил сообщение
  // const isMessageFromAdmin = (message: MessageT) => {
  //   return message.userId === 1; // Админ всегда имеет userId = 1
  // };

  // Функция для определения, кто отправил сообщение относительно текущего пользователя
  const isMessageFromCurrentUser = (message: MessageT) => {
    if (isAdminView && selectedUserId) {
      // В админ-режиме: сообщения от админа (userId = 1) идут справа
      return message.userId === 1;
    } else {
      // В пользовательском режиме: сообщения от текущего пользователя идут справа
      return message.userId === currentUser.id;
    }
  };

  return (
    <div className={`${styles.containerUserMessage} p-6`}>
      <div
        className={`${styles.boxChat} min-h-[400px] max-h-[500px] overflow-y-auto`}
      >
        {isLoading ? (
          <div className="text-center text-muted-foreground p-8">
            Загрузка сообщений...
          </div>
        ) : displayMessages.length > 0 ? (
          displayMessages.map((message: MessageT) => (
            <div
              key={message.id}
              className={
                isMessageFromCurrentUser(message)
                  ? styles.messageRight // Сообщения справа (от текущего пользователя)
                  : styles.messageLeft // Сообщения слева (от собеседника)
              }
            >
              <div className={styles.messageContent}>
                <p className="text-foreground">{message.content}</p>
                <span className={`${styles.messageTime} text-muted-foreground`}>
                  {message.createdAt &&
                    new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground p-8">
            Нет сообщений
          </div>
        )}
      </div>
      <div className="border-t border-border p-4 bg-muted/20">
        <form onSubmit={submitHandler} className="flex gap-3">
          <div className="flex-1 ">
            <input
              type="text"
              name="content"
              placeholder={
                isAdminView && selectedUserId
                  ? `Сообщение пользователю #${selectedUserId}`
                  : 'Сообщение поддержке'
              }
              value={formData.content}
              onChange={handleInputChange}
              disabled={isAdminView && !selectedUserId}
              className="w-full text-center px-4 py-[8px] bg-card border border-border rounded-l-full text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-luxury disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isAdminView && !selectedUserId}
            className="gradient-primary text-primary-foreground border-0 rounded-r-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
