import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import PreLoader from "./components/PreLoader/PreLoader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
  <div className="min-h-screen flex flex-wrap content-between min-w-full flex-col">
   
   
    <Header/>
    <main>
      {/* <Outlet/> */}
    </main>
    <Footer/>
   
   
  
  </div>:<PreLoader/>
}

export default App

// always env better to put REACT_APP when cra is used this is must 