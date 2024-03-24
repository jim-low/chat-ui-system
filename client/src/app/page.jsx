"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios('http://localhost:8080/chat').then(res => {
      setMessage(res.data.message)
    })
  }, [])

  return (
    <h1>
      haha Home go brr
      <br />
      {message.length === 0 && 'Loading...'}
      {message.length !== 0 && message}
    </h1>
  )
}

export default Home
