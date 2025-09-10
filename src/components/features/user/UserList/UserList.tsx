import React from 'react'
import UserCard from '../UserCard/UserCard'
import styles from './UserList.module.css' 

export default function UserList():React.JSX.Element {
  return (
    <div className={styles.containerUsercard}> 
      <div className={styles.userCard}> 
        <UserCard />
      </div>
    </div>
  )
}