"use client"
import React from 'react'
import { Home } from '../Home'
import { Login } from '../Login'
import { useSelector } from 'react-redux'

export const Landing = () => {
    const {isLoggedIn} = useSelector((state)=>state?.appReducer)
    return (
    <div>
        {isLoggedIn ? <Home/> :<Login/> }
    </div>
  )
}



