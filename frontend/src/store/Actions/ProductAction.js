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


  export const  getProduct = (keyword="",currPage = 1,price=[0,10000],category,ratings=0)=> async(dispatch)=>{
      try {
          dispatch({
              type:ALL_PRODUCT_REQ
          })
          let link= `/api/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
          if(category && category!="All"){
              link = `/api/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
          }
          const data = await axios.get(link)
          console.log("data",data)
          dispatch({
              type:ALL_PRODUCT_SUCCESS,
              payload:data.data
          })
      } catch (error) {
          console.log(error)
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