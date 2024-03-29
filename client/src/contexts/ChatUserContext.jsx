"use client"

import React, { createContext, useContext, useState } from 'react'

const ChatUserContext = createContext(null)

export function ChatUserProvider({ children }) {
  const [chatUser, setChatUser] = useState(null)

  return (
    <ChatUserContext.Provider value={{ chatUser, setChatUser }}>
      { children }
    </ChatUserContext.Provider>
  )
}

export function useChatUser() {
  return useContext(ChatUserContext)
}
