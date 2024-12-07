'use client'
import React from 'react'
import { signIn } from 'next-auth/react'

export const SignInStudent = ({className}) => {
  return (
    <div className={className} onClick={async() => {
      await signIn("student");
    }}>Sign in</div>
      
  )
}

export const SignInTeacher = () => {
  return (
    <button style={{marginTop:"40px", border:"2px solid lightgray", padding:"10px", backgroundColor:"white"}} onClick={async() => {
      await signIn("teacher");
    }}>Sign in as Teacher</button>
      
  )
}

