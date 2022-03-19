import {
  LOGIN_REQ,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
} from "../AcrionTypes/userActionTypes";

import axios from "axios"

export const login = (email,password) => async(dispatch)=>{
    const config = {header:{"Content-type":"application/json"}}
    try {
        dispatch({type:LOGIN_REQ})

        const data= await axios.post("/api/login",
        {email,password},
        config
        )
        console.log("data",data)

        dispatch({type:LOGIN_SUCCESS,payload:data.data.user})
        
    } catch (error) {
        console.log("error",error)
        dispatch({type:LOGIN_FAIL,payload:error.data.error})
    }
}

export const clearErorrs = ()=> async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}