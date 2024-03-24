"use client"

import './Form.css'
import * as Form  from '@radix-ui/react-form'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function formLogin(e) {
    axios.post('http://localhost:8080/login', {
      username: name,
    }).then(res => {
        const data = res.data
        if (data.found) {
          localStorage.setItem("userId", data.user)
          router.replace('/chat')
        }
      })
    e.preventDefault()
  }

  return (
    <Form.Root className="FormRoot center">

      <Form.Field className="FormField" name="username">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">Username</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" value={name} onChange={e => setName(e.target.value)} required />
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
  )
}

export default Login
