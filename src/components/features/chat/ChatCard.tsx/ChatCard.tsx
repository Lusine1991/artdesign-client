import { userByPk } from "@/entities/user/model/thunks";
import { UserWithRelationsT } from "@/entities/user/model/types";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import styles from './ChatCard.module.css' 

type Props = {
  user: UserWithRelationsT;
};

export default function ChatCard({ user }: Props): React.JSX.Element {
  const dispatch = useAppDispatch()
  const lastMessage = user.messages?.[user.messages.length - 1];

  const clickHandler = (id: number):void => {
    void dispatch(userByPk(id))
  }
  
  return (
    <div 
      onClick={() => clickHandler(user.id)}
      className={styles.containerChatcard} 
    >
      <div className="box-chat">
        <div className="user">{user.username}</div>
        <div className="message">
          {lastMessage? lastMessage.content : 'нет сообщений'}
        </div>
      </div>
    </div>
  );
}