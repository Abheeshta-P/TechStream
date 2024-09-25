import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom'
import appWriteAuth from '../appwrite/auth'
import { useDispatch } from 'react-redux';
import {login as storeLogin} from '../features/authSlice'
import {Logo,Input,Button} from './index'

function Signup() {
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const dispatch = useDispatch();
  const {register,handleSubmit} =useForm();

  const signup = async (data) =>{
      setError('');
      try {
        const session = await appWriteAuth.signUp(data);
        if(session){
          try {
            const userData = await appWriteAuth.getCurrentUser();
            if(userData) dispatch(storeLogin({userData}));
            navigate('/');
          } catch (error){
            console.log("signup form :: getCurrentUser :: error",error);
          }
        }
      } catch (error){
        console.log("signupform :: signup :: error",error);
      }
  }
  return (
    <div className="flex items-center justify-center text-black  bg-zinc-300">
    <div className={`w-[85%] mx-auto md:w-full md:max-w-lg bg-zinc-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Log in
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
        <div className='space-y-5 mt-8'>
          <Input
          label="Full Name: "
          placeholder="Enter your full name"
          {...register("name", {
              required: true,
          })}
          />
          <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
              required: true,
              validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
          })}
          />
          <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
              required: true,})}
          />
          <p className='text-black font-bold text-base text-center'> Password should be atleast 8 character long </p>
          <Button children={'Sign up'} type = 'submit' className={'w-full'}/>
          </div>
        </form>
        </div>
        </div>
  )
}

export default Signup