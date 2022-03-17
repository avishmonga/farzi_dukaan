import React, { useEffect } from 'react'
import styled  from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../store/Actions/ProductAction';
import {useParams} from "react-router-dom"
function ProductDetils() {
    const id = useParams()
    console.log(id.id)
    const dispatch = useDispatch()
    const {product,loading,error} = useSelector(state=>state.productDetail)
    useEffect(()=>{
        dispatch(getProductDetail(id.id))

    },[dispatch,id])
  return (
    <>
    <LeftWrapper>
        <div>
            <Carousel>
                {product.image && product.image.map((item,i)=>(
                    <img key={item._id} src={item.url} alt={`${i} slide`} />
                ))}
            </Carousel>
        </div>

    </LeftWrapper>
    
    </>
  )
}

export default ProductDetils

const LeftWrapper = styled.div`

`