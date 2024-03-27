"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './styles/ChatApplication.module.css'
import DesktopSidebarNav from './Navigation/NavBar'
import UserStatus from './User/UserStatus'
import { LoggedInUserProvider, useLogInUser } from '@/contexts/LoggedInUserContext'
import { Box, Flex } from '@radix-ui/themes'
import DirectMessagesDisplay from './DirectMessage/DirectMessagesDisplay'
import GroupsDisplay from './Groups/GroupsDisplay'
import ChatWindow from './Chat/ChatWindow'
import UserProfile from './User/UserProfile'

const ChatAppContainer = () => {
  return (
    <LoggedInUserProvider>
      <ChatApplication />
    </LoggedInUserProvider>
  )
}

const ChatApplication = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState({})
  const { setLoggedInUser } = useLogInUser()

  useEffect(() => {
    if (currentUser.username != null) {
      return
    }

    const userId = localStorage.getItem('userId')
    if (userId == null) router.replace('/login')

    axios.post('http://localhost:8080/user', {
      userId: +userId || 3 // for testing
    }).then(res => {
        setCurrentUser(res.data)
        setLoggedInUser(res.data)
    })
  }, [])

  return (
    <div id={styles.chatApplication}>

      <div className={styles.sider}>
        <DesktopSidebarNav />
        <UserStatus />
      </div>

      <div className={styles.mainSection}>

        <div className={styles.topSection}>
          <h3>Chat</h3>
          <p>Add New profile</p>
        </div>

        <div className={styles.mainUI}>
          <div className={styles.displaySection}>
            <DirectMessagesDisplay />
            <GroupsDisplay />
          </div>
          <div className={styles.chatSection}>
            <ChatWindow />
            <UserProfile />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatAppContainer
