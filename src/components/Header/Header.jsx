import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {Container,Logo, LogoutBtn} from '../index';

// componens which are active are displayed
// to get the active state we use useSelector
function Header() {
  const authStatus = useSelector((state)=>state.authSliceReducer.status);
  const navigate = useNavigate()
  const listIems = [
    {
      name : 'Home',
      slug : '/', //path
      active : true // status
    }
    ,
    {
      name : 'Login',
      slug : '/login',
      active : !authStatus
    }
    ,
    {
      name : 'Signup',
      slug : '/signup',
      active : !authStatus
    }
    ,
    {
      name : 'All posts',
      slug : '/all-posts',
      active : authStatus
    }
    ,
    {
      name : 'Add post',
      slug : '/add-post',
      active : authStatus
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500 w-full'>
      <Container>
        <nav className='flex'>
            <div className="mr-4">
              <Link to={"/"}>
              <Logo/>
              </Link>
            </div>
            <div className="flex justify-evenly">
             <ul className='flex'>
              {
                listIems.map(list => list.active ? (
                  <li key={list.name}>
                    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=>navigate(list.slug)}>{list.name}</button>
                  </li>
                ): null)
              }
              {
                authStatus && (<li>
                  <LogoutBtn/>
                </li>)
              }
             </ul>
            </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
{/* <Link to={list.slug} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >{list.name}</Link> */}