import axios from "axios"

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQ,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQ,
    CLEAR_ERRORS,
  } from "../AcrionTypes/ProductActionTypes";


  export const  getProduct = (keyword="",currPage = 1)=> async(dispatch)=>{
      try {
          dispatch({
              type:ALL_PRODUCT_REQ
          })
          let link= `/api/products?keyword=${keyword}&page=${currPage}`
          const data = await axios.get(link)
          console.log("data",data)
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
 

  export const  getProductDetail = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQ
        })
        const data = await axios.get(`/api/product/${id}`)
        console.log("data",data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

  export const  clearErrors = ()=> async(dispatch)=>{

    dispatch({type:CLEAR_ERRORS})

  }