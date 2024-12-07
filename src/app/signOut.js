'use client'
import { signOut } from 'next-auth/react';
import React from 'react'

const SignOut = ({className}) => {
  return (
    <div  className={className} onClick={() => signOut()}>Sign out</div>
  )
}

export default SignOut