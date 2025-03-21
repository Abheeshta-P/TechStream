import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom'
import appWriteAuth from '../appwrite/auth'
import { useDispatch } from 'react-redux';
import {login as storeLogin} from '../features/authSlice'
import {Input,Button} from './index'

function Login() {
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm();

   const login = async(data)=>{ // data is obj
    setError('');
    try {
      const session = await appWriteAuth.login(data);
      if (session) {
        try {
          const userData = await appWriteAuth.getCurrentUser();
          if(userData) dispatch(storeLogin({userData}));
          navigate('/');
        } catch (error){
          console.log("login form :: getCurrentUser :: error",error);
        }
      }
    } catch(error) {
      console.log("login form :: login :: error",error);
    }
  }
  return (
    <div className='flex items-center justify-center w-full text-black  bg-zinc-300'>
        <div className={`w-[85%] mx-auto md:w-full md:max-w-lg bg-zinc-100 rounded-xl p-10 border border-black/10`}>
        
        <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8 '>
        <div className='space-y-5'>
          <Input
          label = 'Email : '
          type = 'email'
          placeholder = 'Enter your Email'
          {
            ...register ('email',{
              required : true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
            })
          }
          />
          <Input
          label = 'Password : '
          type = 'password'
          placeholder = 'Enter your Password'
          {
            ...register ('password',{
              required : true
            }
            )
          }
          />
          <Button children={'Log in'} type = 'submit' className={'w-full'}/>
          </div>
        </form>
        </div>
        </div>
  )
}

export default Login

