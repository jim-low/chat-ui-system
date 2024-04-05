"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const loadingStyle = {
  width: "100vw",
  height: "100vh",
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  }, [])

  return (
    <div style={loadingStyle}>Loading...</div>
  )
}
