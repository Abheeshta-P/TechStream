import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import {PreLoader,Header,Footer} from './components'
import { Outlet } from "react-router-dom";

function App() {
  // at first when app loads get the user status
  const [loading,setLoadingStatus] = useState(true);
  const dispatch = useDispatch();

  // when app loads useEffect is invoked
  useEffect (()=>{
    // check whether there is any logged in user
    authService.getCurrentUser().then((userData) =>{
      // if userAccount is there show the logged in ui
      if (userData){
        dispatch(login({userData}));
      }
      else {
        dispatch(logout());
      }
    }). catch( error=>{
      console.log("App.jsx useEffect and getCurrentUser :: error",error);
    }). finally(()=>{
      setLoadingStatus(false);
    })
   
  },[])

  return !loading ?  
  <div className="flex flex-col min-h-screen bg-zinc-50 ">
  <Header />
  <main className="flex-grow bg-zinc-300 mt-14">
    <Outlet />
  </main>
  <Footer />
</div>
:<div className="w-full h-screen flex justify-center items-center"><PreLoader/></div>
}

export default App

// always env better to put REACT_APP when cra is used this is must 