"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './styles/ChatApplication.module.css'
import DesktopSidebarNav from './Navigation/NavBar'
import UserStatus from './User/UserStatus'
import { LoggedInUserProvider, useLogInUser } from '@/contexts/LoggedInUserContext'
import { Box, Flex, Heading } from '@radix-ui/themes'
import DirectMessagesDisplay from './DirectMessage/DirectMessagesDisplay'
import GroupsDisplay from './Groups/GroupsDisplay'
import ChatWindow from './Chat/ChatWindow'
import UserProfile from './User/UserProfile'
import { ChatUserProvider } from '@/contexts/ChatUserContext'

const ChatAppContainer = () => {
  return (
    <LoggedInUserProvider>
      <ChatUserProvider>
        <ChatApplication />
      </ChatUserProvider>
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

    axios(`http://13.212.255.177/api/chatSystem/user/${+userId}`).then(res => {
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
          <Heading>Chat</Heading>
          <p style={{ margin: 0 }}>Add New profile</p>
        </div>

        <div className={styles.mainUI}>
          <Flex direction='column' className={styles.displaySection}>
            <DirectMessagesDisplay />
            <GroupsDisplay />
          </Flex>
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
