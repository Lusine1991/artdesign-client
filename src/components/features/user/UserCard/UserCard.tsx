// components/features/user/UserCard/UserCard.tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import styles from './UserCard.module.css' 
import { setSelectedUser } from '@/entities/user/model/slice'

export default function UserCard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((store) => store.user.currentUser);
  const users = useAppSelector((store) => store.user.users);
  const selectedUserId = useAppSelector((store) => store.user.selectedUserId);

  const handleUserSelect = (userId: number) => {
    dispatch(setSelectedUser(userId));
  };

  // Фильтруем только обычных пользователей (не админов)
  const regularUsers = users.filter(user => !user.isAdmin);

  return (
    <div className={styles.containerUsercard}>
      {/* Информация о текущем пользователе */}
      <div className={styles.currentUser}>
        <h3>Ваш профиль</h3>
        <div>{currentUser?.username}</div>
        <div>{currentUser?.email}</div>
        <div>{currentUser?.isAdmin ? 'Администратор' : 'Пользователь'}</div>
      </div>

      {/* Список пользователей для админа */}
      {currentUser?.isAdmin && (
        <div className={styles.usersList}>
          <h3>Пользователи для чата</h3>
          {regularUsers.map((user) => (
            <div
              key={user.id}
              className={`${styles.userItem} ${selectedUserId === user.id ? styles.selected : ''}`}
              onClick={() => handleUserSelect(user.id)}
            >
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}