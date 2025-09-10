import { MessageT } from "@/entities/message/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FormEvent, useState } from "react";
import styles from "./MessageCard.module.css";
import { NewChatT } from "@/entities/chat/model/types";
import { addMessage } from "@/entities/chat/model/thanks";

export default function MessageCard(): React.JSX.Element {
  const currentUser = useAppSelector((store) => store.user.currentUser);
  console.log(currentUser)
  const messages = currentUser?.messages || [];
  const dispatch = useAppDispatch()

  const [sendMessage, setSendMessage] = useState<NewChatT>({
    content: '',
    chatId: 1
  });

  if(!currentUser){
    return <div></div>
  }

  const submitHandler = (e:FormEvent)  => {
    e.preventDefault();
    if(!sendMessage.content.trim()) {
      alert("Сообщение не может быть пустым");
      return
    }

    setSendMessage({
      content: '',
      chatId: currentUser.id 
    })

    void dispatch(addMessage(sendMessage))
  }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setSendMessage(prev => ({
        ...prev, 
        [name]: value
      }))
    }

  return (
    <div className={styles.containerUserMessage}>
      <div className={styles.boxChat}>
        {messages.length > 0 ? (
          messages.map((message: MessageT) => (
            <div key={message.id} className={styles.messageUserAdmin}>
              <p>{message.content}</p>
              <span className={styles.messageTime}>
                {/* {new Date(message.createdAt).toLocaleTimeString()} */}
              </span>
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
              value={sendMessage.content}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}
