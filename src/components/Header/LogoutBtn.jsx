import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
  const dispacth = useDispatch();
  const inputHandler = ()=>{
    authService.logout().then(()=>{
      dispacth(logout());
    })
  }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={inputHandler}>Logout</button>
  )
}

export default LogoutBtn