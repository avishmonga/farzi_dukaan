import axios from "axios"

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQ,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
  } from "../AcrionTypes/ProductActionTypes";


  export const  getProduct = ()=> async(dispatch)=>{
      try {
          dispatch({
              type:ALL_PRODUCT_REQ
          })
          const data = await axios.get("/api/products")
          dispatch({
              type:ALL_PRODUCT_SUCCESS,
              payload:data.data
          })
      } catch (error) {
          dispatch({
              type:ALL_PRODUCT_FAIL,
              payload:error.response.data.message
          })
      }
  }

  export const  clearErrors = ()=> async(dispatch)=>{

    dispatch({type:CLEAR_ERRORS})

  }