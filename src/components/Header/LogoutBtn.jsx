import React from 'react'
import appWriteAuth from '../../appwrite/auth'
import { logout } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
  const dispacth = useDispatch();
  const inputHandler = ()=>{
    appWriteAuth.logout().then(()=>{
      dispacth(logout());
    }).catch(error =>{
      console.log("Logout button :: appWriteAuth.logout :: error",error);
    })
  }
  return (
    <>
    <button className='hidden md:block px-4 py-[7px] font-semibold text-base text-white bg-zinc-800 rounded-full hover:bg-zinc-900 transition duration-200 ease-in-out' onClick={inputHandler}>Logout</button>
    <button className='md:hidden p-2  font-semibold text-base text-white bg-zinc-800 rounded-full hover:bg-zinc-900 transition duration-200 ease-in-out' onClick={inputHandler}><img src='"../../../logout-xxl.png' className='w-5 h-4'></img></button>
    </>
  )
}

export default LogoutBtn