import { UserWithRelationsT } from "@/entities/user/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import styles from "./ChatCard.module.css";
import { setSelectedUser } from "@/entities/user/model/slice";

type Props = {
  user: UserWithRelationsT;
};

export default function ChatCard({ user }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(
    (state) => state.user.unreadMessages[user.id] || 0
  );

  const clickHandler = (id: number): void => {
    dispatch(setSelectedUser(id));
    // void dispatch(userByPk(id))
  };

  return (
    <div
      onClick={() => clickHandler(user.id)}
      className={styles.containerChatcard}
    >
      <div className="box-chat">
        <div className={styles.userInfo}>
        <div className="w-auto max-w-full size-[50px] text-[24px] text-luxury-name font-semibold ">
          {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}
        </div>
          {/* ← ДОБАВИТЬ: индикатор непрочитанных сообщений */}
          {unreadCount > 0 && (
            <div className={styles.unreadBadge}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
