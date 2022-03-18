import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {getProduct, clearErrors} from "../store/Actions/ProductAction"
import Loader from './Loader';
import styled from 'styled-components';
import Product from "./Product"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography"
import createTypography from '@mui/material/styles/createTypography';
const categoris = [  
    "All",
    "T-shirts",
    "Jeans",
    "Track-Pants",
    "Shirts",
    "Caps",
    "Formal",
    "Footwear"
]
function Products() {
    const [currPage,setCurrPage] = useState(1)
    const keyword  = useParams().keyword
    const [price,setPrice] = useState([0,10000])
    const [category,setCategory] = useState("")
    const [ratings,setRatings]  = useState(0)
    console.log(ratings)

    const {loading,products,error,productsCount,resultPerPage} = useSelector((state)=>state.products)
    const dispatch = useDispatch()
    console.log("productsCount",productsCount)
    useEffect(()=>{
        dispatch(getProduct(keyword,currPage,price,category,ratings))

    },[dispatch,keyword,currPage,price,category,ratings])
    const setCurrPageNo = (e)=>{
        setCurrPage(e)

    }
    const priceHandler = (event,newPrice)=>{
        setPrice(newPrice)

    }
    const newRatings = (e,newRating)=>{
        setRatings(newRating)
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
        <Filter>
            <Typography>
                Price

            </Typography>
            <Slider 
            
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            area-labelledby="range-slider"
            min={0}
            max={10000}
            />

            <Typography>
                Categories
            </Typography>
            <ul className='category-Box'>
                {categoris.map((category)=>{
            
                  return   <li className='category-link' onClick={()=>setCategory(category)} key={category}>{category}</li>
                })}

            </ul>

     
                <Typography component="legend">Ratings Above</Typography>
                <Slider 
                value={ratings}
                onChange={newRatings}
            area-labelledby="continues-slider"
            min={0}
            max={5}
            valueLabelDisplay="auto"
                /> 

           

        </Filter>
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
margin-left: 4vmax;
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
@media screen and (max-width:600px) {
.page-link{
    font:300 1.7vmax "Roboto";
}
}
`

const Filter = styled.div`
width: 14vmax;
position: absolute;
top:15vmax;
left:2vmax;
.category-Box{
    padding: 0;
    .category-link{
        list-style: none;
        color:rgba(0,0,0,0.61);
        font:400 1vmax "Roboto";
        margin: 0.4vmax;
        cursor: pointer;
        transition: all 0.5s;
        &:hover{
            color:tomato;
        }
    }
    @media screen and (max-width:600px) {
        .category-link{
        font:400 1.8vmax "Roboto";

    }

    }
    
}
@media screen and (max-width:600px) {
    width:20vmax;
    position: static;
    margin: auto;
   
}

`