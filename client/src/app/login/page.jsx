"use client"

import './Form.css'
import * as Form  from '@radix-ui/react-form'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flex } from '@radix-ui/themes'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function formLogin(e) {
    axios('http://13.212.255.177/api/chatSystem/users/list').then(res => {
      const users = res.data
      for (let i = 0; i < users.length; ++i) {
        const currUser = users[i]
        const splitName = currUser.username.split(" ")
        if (currUser.username.includes(username) || splitName.includes(username)) {
          localStorage.setItem("userId", currUser.id)
          router.replace("/chat")
          break
        }
      }
    })
    e.preventDefault()
  }

  return (
    <Flex justify='center' align='center' width="100vw" height="100vh">
      <Form.Root className="FormRoot center">

        <Form.Field className="FormField" name="username">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Username</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your username
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="password">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Password may not matter, but please fill it
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }} onClick={formLogin}>
            Login
          </button>
        </Form.Submit>
      </Form.Root>
    </Flex>
  )
}

export default Login
