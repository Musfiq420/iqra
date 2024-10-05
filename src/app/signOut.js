'use client'
import { signOut } from 'next-auth/react';
import React from 'react'

const SignOut = ({stl}) => {
  return (
    <button  style={stl} onClick={() => signOut()}>Sign out</button>
  )
}

export default SignOut