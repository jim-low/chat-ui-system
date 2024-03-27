"use client"

import React, { createContext, useContext, useState } from 'react'

const LoggedInUserContext = createContext(null)

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null)

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      { children }
    </LoggedInUserContext.Provider>
  )
}

export function useLogInUser() {
  return useContext(LoggedInUserContext)
}
