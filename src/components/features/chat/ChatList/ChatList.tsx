import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import styles from './ChatList.module.css' 
import ChatCard from "../ChatCard.tsx/ChatCard";

export default function ChatList(): React.JSX.Element {
  const users = useAppSelector((store) => store.user.users);
  const [searchQuery, setSearchQuery] = useState("");


  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className={styles.constinerInputChatlist}>
      <div className={styles.inputSearch}>
        <input 
          type="text" 
          name="username" 
          placeholder="Поиск чатов" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.chatMap}>
        {filteredUsers.map((user) => (
          <ChatCard key={user.id} user={user}/>
        ))}
        
        {filteredUsers.length === 0 && searchQuery && (
          <div className={styles.noResults}>
            Чаты не найдены
          </div>
        )}
      </div>
    </div>
  );
}