import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {getProduct, clearErrors} from "../store/Actions/ProductAction"
import Loader from './Loader';
import styled from 'styled-components';
import Product from "./Product"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
function Products() {
    const [currPage,setCurrPage] = useState(1)
    const keyword  = useParams().keyword

    const {loading,products,error,productsCount,resultPerPage} = useSelector((state)=>state.products)
    const dispatch = useDispatch()
    console.log("productsCount",productsCount)
    useEffect(()=>{
        dispatch(getProduct(keyword,currPage))

    },[dispatch,keyword,currPage])
    const setCurrPageNo = (e)=>{
        setCurrPage(e)

    }
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
        {resultPerPage < productsCount &&(
            <PaginationWrapper>
            <Pagination activePage={currPage} itemsCountPerPage={resultPerPage} 
            totalItemsCount={productsCount}
            onChange={setCurrPageNo}
            pageRangeDisplayed={3}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass='page-item'
            linkClass='page-link'
            activeClass='page-item-active'
            activeLinkClass='page-link-active'
            />

        </PaginationWrapper>
        )}
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

const PaginationWrapper = styled.div`
display: flex;
justify-content: center;
margin: 6vmax;
.pagination{
    display: flex;
    justify-content: center;
    padding: 0;
}

.page-item{
    background-color: white;
    list-style: none;
    border: 1px solid rgba(0,0,0,0.178);
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
    &:hover{
        background-color: rgb(230,230,230);
        .page-link{
            color: rgb(80,80,80); 
        }
    }
}
.page-Item:first-child{
    border-radius: 5px 0 0 5px;
}
.page-link{
    text-decoration: none;
    font: 300 0.7vmax "Roboto";
    color: rgba(80,80,80);
    transition: all 0.3s;

}
.page-item-active{
    background-color: tomato;
}
.page-link-active{
    color: white;
}
`