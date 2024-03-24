"use client"

import React, { createContext, useContext, useState } from 'react'

const LoggedInUserContext = createContext(null)

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, _] = useState(null)

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser }}>
      { children }
    </LoggedInUserContext.Provider>
  )
}

export function useLogInUser() {
  return useContext(LoggedInUserContext)
}
