import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {Container,Logo, Logoicon, LogoutBtn} from '../index';

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
      name : 'My posts',
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
    <header className=' fixed z-50 py-4 shadow bg-zinc-600/90 text-white w-full'>
  <Container>
    <nav className=' flex items-center justify-between'>
      <div className="mr-4">
        <Link to={"/"} className='hidden md:block'>
          <Logo />
        </Link>
        <Link to={"/"} className='md:hidden'>
          <Logoicon />
        </Link>
      </div>

      <div className="md:flex md:space-x-6">
        <ul className='flex space-x-4'>
          {listIems.map(list => list.active && (
            <li key={list.name}>
              <button 
                className='px-4 py-[7px] font-semibold text-sm text-white bg-zinc-800 rounded-full hover:bg-zinc-900 transition duration-200 ease-in-out md:text-base'
                onClick={() => navigate(list.slug)}
              >
                {list.name}
              </button>
            </li>
          ))}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </nav>
  </Container>
</header>

  )
}

export default Header
{/* <Link to={list.slug} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >{list.name}</Link> */}