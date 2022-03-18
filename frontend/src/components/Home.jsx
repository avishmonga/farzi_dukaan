import React, { useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product'
import MetaData from './MetaData'
import { clearErrors, getProduct } from '../store/Actions/ProductAction'
 
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader'
import {useAlert} from 'react-alert'


// const product = {
//     name:"Blue Tshirt",
//     price:3000,
//     _id:"new",
//     images:[{url:"https://assets.ajio.com/medias/sys_master/root/20220121/DwGv/61ea58afaeb2695cdd2436ee/-473Wx593H-461575169-maroon-MODEL.jpg"}]
// }

function Home() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading,products,error,productsCount} = useSelector(state=>state.products)
    useEffect(()=>{
        if(error){
             alert.error(error)
             dispatch(clearErrors())
        }

        dispatch(getProduct())

    },[dispatch,error,alert])
  return (
    <>
    {loading?<Loader />:<>
    <MetaData title="Farzi Dukaan" />
    <Banner>
        <img src="https://user-images.githubusercontent.com/80064807/158645366-333a156f-e2e6-4202-b35c-97e2e688232d.jpg" />
    </Banner>

    <ProductsWrap>
        <h2>Featured Products</h2>

        <Wrap>
           {products && products.map((product)=>{
               return <Product product={product} />
           } )}
        </Wrap>

    </ProductsWrap>
    
    </>}
    </>
  )
}

export default Home

const Banner = styled.div`
width:100%;
height: 400px;

img{
    width:100%;
    height: 100%;
}

`
const ProductsWrap = styled.div`
h2{
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.4vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 20vmax;
    margin: 5vmax auto;
}

`
const Wrap = styled.div`
display: flex;
margin:2vmax auto;
width:90vw;
flex-wrap: wrap;
max-width: 100%;


`