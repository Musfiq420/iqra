'use client'
import React from 'react'
import { signIn } from 'next-auth/react'

export const SignInStudent = ({stl}) => {
  return (
    <button style={stl} onClick={async() => {
      await signIn("student");
    }}>Sign in</button>
      
  )
}

export const SignInTeacher = () => {
  return (
    <button style={{marginTop:"40px", border:"2px solid lightgray", padding:"10px", backgroundColor:"white"}} onClick={async() => {
      await signIn("teacher");
    }}>Sign in as Teacher</button>
      
  )
}

