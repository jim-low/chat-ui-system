"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChatApplication = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId == null) router.replace('/login')

    axios.post('http://localhost:8080/user', {
      userId: +userId
    }).then(res => {
        setCurrentUser(res.data)
    })
  }, [])

  return (
    <div className='center'>
      {currentUser.username == null && "Loading..."}
      {currentUser.username != null && `Welcome, ${currentUser.username}!`}
    </div>
  )
}

export default ChatApplication
