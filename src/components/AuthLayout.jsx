import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protected({
  children,
  authorized = true
}) {
  const storeAuthStatus = useSelector(state => state.authSliceReducer.status);
  const navigate  = useNavigate();
  const [loader,setLoader] = useState(true);
  useEffect(()=>{
    // says logged in but logout => change state to login
    if(authorized && storeAuthStatus!==authorized){
      navigate('/login');
    }
    // says logged out but logged in => show home page
    else if (!authorized && storeAuthStatus!==authorized){
      navigate('/');
    }
    setLoader(false);
  },[authorized,storeAuthStatus,navigate]);
  return loader?<h1>Loading...</h1> : <>{children}</>
}

export default Protected;
