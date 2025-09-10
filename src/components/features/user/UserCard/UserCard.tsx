import { useAppSelector } from '@/store/hooks'
import React from 'react'
import styles from './UserCard.module.css' 

export default function UserCard():React.JSX.Element {
    const currentUser = useAppSelector((store) => store.user.currentUser)
  return (
    <div className={styles.containerUsercard}>
        <div>
            {currentUser?.username}
        </div>
        <div>
            {currentUser?.email}
        </div>
    </div>
  )
}