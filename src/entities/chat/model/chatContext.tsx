import type React from "react";
import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { ChatContextT } from "./types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUser, deleteUser } from "./slices";
import { getMessagesUser, getAdminChat } from "@/entities/user/model/thunks";
import { store } from "@/store/store"; // ← ДОБАВИТЬ ЭТОТ ИМПОРТ
import { incrementUnreadMessage } from "@/entities/user/model/slice";

const ChatContext = createContext<ChatContextT | null>(null);

export default function ChatProvider({
  children,
}: {
  children: React.JSX.Element;
}): React.JSX.Element {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  // const currentUser = useAppSelector((state) => state.user.currentUser);
  const selectedUserId = useAppSelector((state) => state.user.selectedUserId);
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  // Правильное определение админ-режима
  const isAdminView = user?.isAdmin && status === "admin";

  const connect = useCallback((): void => {
    console.log("=== CHAT CONTEXT CONNECT CALLED ===");
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket("wss://ArtDesignGevorgyans.mooo.com");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (e: { data: string }) => {
      console.log("=== WebSocket message received ===");
      console.log("Raw data:", e.data);
      console.log("About to try JSON.parse...");
      try {
        const action = JSON.parse(e.data);
        console.log("WebSocket message received:", action);
        console.log("Parsed action:", action);
        console.log("Action type:", action.type);

        switch (action.type) {
          case "chat/addUser":
            dispatch(addUser(action.payload));
            break;
          case "chat/deleteUser":
            dispatch(deleteUser(action.payload));
            break;
          case "chat/newMessage":
            console.log("New message notification:", action.payload);

            // Обновляем сообщения только для релевантных чатов
            const currentPath = window.location.pathname;
            const messageChatId = action.payload.chatId;
            const messageUserId = action.payload.userId;

            // ИСПРАВЛЕННАЯ ЛОГИКА - получаем актуальные значения из store:
            const currentState = store.getState();
            const currentIsAdminView =
              currentState.user.user?.isAdmin &&
              currentState.user.status === "admin";
            const currentSelectedUserId = currentState.user.selectedUserId;

            if (
              messageUserId !== 1 &&
              currentIsAdminView &&
              currentSelectedUserId !== messageChatId
            ) {
              dispatch(incrementUnreadMessage(messageChatId));
            }

            // ДОБАВИТЬ ОТЛАДОЧНЫЕ ЛОГИ:
            console.log("=== DEBUG CHAT CONTEXT ===");
            console.log("currentPath:", currentPath);
            console.log("messageChatId:", messageChatId);
            console.log("messageUserId:", messageUserId);
            console.log("OLD isAdminView:", isAdminView);
            console.log("OLD selectedUserId:", selectedUserId);
            console.log("NEW currentIsAdminView:", currentIsAdminView);
            console.log("NEW currentSelectedUserId:", currentSelectedUserId);

            console.log("Path check:", {
              includesChat: currentPath.includes("/chat"),
              includesUserProfile: currentPath.includes("/user-profile"),
              fullPath: currentPath,
            });

            if (
              currentPath.includes("/chat") ||
              currentPath.includes("/user-profile")
            ) {
              console.log("Path condition passed!");

              // ИСПРАВЛЕННАЯ ЛОГИКА - используем актуальные значения:
              if (currentIsAdminView && currentSelectedUserId) {
                console.log(
                  "Updating messages for admin chat with userId:",
                  currentSelectedUserId
                );
                dispatch(getAdminChat(currentSelectedUserId));
              } else {
                console.log("Updating messages for user");
                dispatch(getMessagesUser());
              }
            } else {
              console.log("Path condition failed! Current path:", currentPath);
            }
            break;
          default:
            console.log("Unknown WebSocket action:", action.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        console.error("Raw data that failed to parse:", e.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      // Переподключение через 3 секунды
      setTimeout(() => {
        if (ws.current?.readyState !== WebSocket.OPEN) {
          connect();
        }
      }, 3000);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const sendMessage = (data: string | object): void => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const message = typeof data === "string" ? data : JSON.stringify(data);
      ws.current.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  // Автоматическое подключение при монтировании
  useEffect(() => {
    console.log("=== CHAT CONTEXT USEEFFECT CALLED ===");
    connect();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  return (
    <ChatContext.Provider value={{ connect, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextT {
  const context = useContext(ChatContext);
  if (!context) throw new Error("Cannot use useChat outside ChatProvider");
  return context;
}
