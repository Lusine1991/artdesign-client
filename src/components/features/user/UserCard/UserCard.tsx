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

  // Получаем выбранного пользователя
  const selectedUser = users.find(user => user.id === selectedUserId);

  // Если выбран чат - показываем информацию о выбранном пользователе
  if (selectedUserId && selectedUser) {
    return (
      <div className={styles.containerUsercard}>
        <div className={styles.selectedUser}>
          <h3>Чат с пользователем</h3>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{selectedUser.username}</div>
            <div className={styles.userEmail}>{selectedUser.email}</div>
            <div className={styles.userStatus}>
              {selectedUser.isAdmin ? 'Администратор' : 'Пользователь'}
            </div>
            {selectedUser.photo && (
              <div className={styles.userPhoto}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedUser.photo} alt={selectedUser.username} />
              </div>
            )}
          </div>
          
          {/* Кнопка для возврата к списку */}
          <button 
            className={styles.backButton}
            onClick={() => dispatch(setSelectedUser(null))}
          >
            ← Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  // Если чат не выбран - показываем профиль админа и список пользователей
  return (
    <div className={styles.containerUsercard}>
      {/* Информация о текущем пользователе (админе) */}
      <div className={styles.currentUser}>
        <h3>Ваш профиль</h3>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{currentUser?.username}</div>
          <div className={styles.userEmail}>{currentUser?.email}</div>
          <div className={styles.userStatus}>
            {currentUser?.isAdmin ? 'Администратор' : 'Пользователь'}
          </div>
          {currentUser?.photo && (
            <div className={styles.userPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentUser.photo} alt={currentUser.username} />
            </div>
          )}
        </div>
      </div>

      {/* Список пользователей для выбора чата */}
      <div className={styles.usersList}>
        <h3>Выберите чат</h3>
        <p className={styles.instruction}>Кликните на пользователя, чтобы открыть чат</p>
        {users
          .filter(user => !user.isAdmin) // Фильтруем только обычных пользователей
          .map((user) => (
            <div
              key={user.id}
              className={styles.userItem}
              onClick={() => handleUserSelect(user.id)}
            >
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          ))}
      </div>
    </div>
  );
}