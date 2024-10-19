"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import {Home} from '../components/Home'
import {Login} from '../components/Login'

export default function page() {
  const isLoggedIn = useSelector(state=>state?.appReducer?.isLoggedIn)
  return (
    <div>
       {isLoggedIn ? <Home/>:<Login/>}
    </div>
  )
}
