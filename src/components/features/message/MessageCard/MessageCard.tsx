import type { MessageT } from "@/entities/message/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./MessageCard.module.css";
import { NewChatT } from "@/entities/chat/model/types";
import { addMessage } from "@/entities/chat/model/thanks";
import { useChat } from "@/entities/chat/model/chatContext";


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
    content: "",
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
    return <div>Пользователь не найден</div>;
  }

  const isAdmin = currentUser.isAdmin;
  const isAdminView = isAdmin && status === "admin";

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      alert("Сообщение не может быть пустым");
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
            type: "newMessage",
            chatId: messageToSend.chatId,
            userId: currentUser.id,
          })
        );

        // if (isAdminView && selectedUserId) {
        //   dispatch(getAdminChat(selectedUserId));
        // } else {
        //   dispatch(getMessagesUser());
        // }
      })
      .catch((error) => {
        console.log(error);
        
      });

    setFormData((prev) => ({
      ...prev,
      content: "",
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
    <div className={styles.containerUserMessage}>
      <div className={styles.boxChat}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка сообщений...</div>
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
                <p>{message.content}</p>
                <span className={styles.messageTime}>
                  {message.createdAt &&
                    new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noMessages}>Нет сообщений</div>
        )}
      </div>
      <div className="new-sms">
        <form onSubmit={submitHandler}>
          <div className="input">
            <input
              type="text"
              name="content"
              placeholder={
                isAdminView && selectedUserId
                  ? `Сообщение пользователю #${selectedUserId}`
                  : "Сообщение поддержке"
              }
              value={formData.content}
              onChange={handleInputChange}
              disabled={isAdminView && !selectedUserId}
            />
          </div>
          <button type="submit" disabled={isAdminView && !selectedUserId}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
