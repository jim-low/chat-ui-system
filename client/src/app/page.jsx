"use client"

import React from 'react'

export default function Home() {
  if (window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/") {
    window.location.href = "http://localhost:3000/login"
  }

  return (
    <div>Loading...</div>
  )
}
