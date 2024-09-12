import { createSlice } from "@reduxjs/toolkit";

// check when app starts, user is logged in or not possibly in all components
const initialState = {
  status : false,
  userData : null
}

const authSlice = createSlice({
  name : 'auth',
  initialState,
  // to operate on the store's status of login and its data use reducers and actions
  reducers : {
    login : (state,action) =>{
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout : (state) =>{
      state.status = false;
      state.userData = null;
    }
  }
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;