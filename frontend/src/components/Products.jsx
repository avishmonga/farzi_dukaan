import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {getProduct, clearErrors} from "../store/Actions/ProductAction"
import Loader from './Loader';
import styled from 'styled-components';
import Product from "./Product"
import { useParams } from 'react-router-dom';
function Products() {
    const keyword  = useParams().keyword

    const {loading,products,error,productsCount} = useSelector((state)=>state.products)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProduct(keyword))

    },[dispatch,keyword])
  return (
    <>
    {loading?<Loader />:<>

    <Wrapper>
        <h2>Products</h2>
        <Wrap>
           {products && products.map((product)=>{
               return <Product product={product} />
           } )}
        </Wrap>
    </Wrapper>
    
    </>}
    </>
  )
}

export default Products

const Wrapper = styled.div`
h2{
    margin:2vmax auto;
    width:15vw;
    border-bottom:1px solid rgba(0,0,0,0.171);
    padding: 2vmax;
    color:rgba(0,0,0,0.671);
    font: 500 1.5vmax "Roboto";
    text-align: center;
}
`

const Wrap = styled.div`
display: flex;
flex-wrap: wrap;
padding: 0 5vmax;
justify-content: center;
`