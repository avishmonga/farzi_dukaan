import {
  LOGIN_REQ,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_REQ,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQ,
  UPDATE_PROFILE_RESET

} from "../AcrionTypes/userActionTypes";

import axios from "axios"
//sign in
export const login = (email,password) => async(dispatch)=>{
    const config = {header:{"Content-type":"application/json"}}
    try {
        dispatch({type:LOGIN_REQ})

        const data= await axios.post("/api/login",
        {email,password},
        config
        )
        console.log("loginDAta",data)

        dispatch({type:LOGIN_SUCCESS,payload:data.data.user})
        
    } catch (error) {
        console.log("error",error)
        dispatch({type:LOGIN_FAIL,payload:"Invalid User Details"})
    }
}
//sign up
export const register = (userData) => async(dispatch)=>{

    try {
        dispatch({type:REGISTER_REQ})
        const config = {header:{"Content-type":"application/json"}}
        const data= await axios.post("/api/register", userData , config)
        dispatch({type:REGISTER_SUCCESS, payload:data.data.user})
    } catch (error) {
        dispatch({type:REGISTER_FAIL,payload:"Invalid Details"})
    }


}


//update User

export const updateProfile = (userData) => async(dispatch)=>{

    try {
        dispatch({type:UPDATE_PROFILE_REQ})
        const config = {header:{"Content-type":"application/json"}}
        const data= await axios.patch("/api/me/update", userData , config)
        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data.data.success})
    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAIL,payload:"Invalid Details"})
    }


}

//loadUser

export const loadUser = () => async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQ})

        const data= await axios.get("/api/me")


        dispatch({type:LOAD_USER_SUCCESS,payload:data.data.userDetail})
        
    } catch (error) {
        console.log("error",error)
        dispatch({type:LOAD_USER_FAIL,payload:""})
    }
}
//logOut
export const logout = () => async(dispatch)=>{
    try {
        await axios.get("/api/logout")


        dispatch({type:LOGOUT_SUCCESS})
        
    } catch (error) {
        console.log("error",error)
        dispatch({type:LOGOUT_FAIL,payload:"Something Went Wrong"})
    }
}

export const clearErorrs = ()=> async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}