"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatApplication = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    axios.post('http://localhost:8080/user', {
      userId: +userId
    }).then(res => {
        setCurrentUser(res.data)
    })
  }, [])

  return (
    <div className='center'>
      Welcome, {currentUser.username}!
    </div>
  )
}

export default ChatApplication
