import React from 'react'
import { Link } from 'react-router-dom'
import ReactStarts from "react-rating-stars-component"
import styled from 'styled-components'
const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 10 : 25,
    value:2.5,
    isHalf:true
}
function Product({product}) {
  return (
    <Wrapper className='card' to={product._id}>
        <Container>

        <img  src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>

        <Wrap>
            <ReactStarts {...options} /> <span>(250 Reviews)</span>
        </Wrap>
        <span>₹{product.price}</span>

        </Container>
        

    
    </Wrapper>
  )
}

export default Product

const Wrapper = styled(Link)`
text-decoration: none;
`
const Container = styled.div`
width: 18vmax;
display: flex;
flex-direction: column;
color: rgba(48,48,48);
margin: 2vmax;
transition: all 0.5s;
padding-bottom: 0.5vmax;

img{
    width: 18vmax;
}
p{
    font-family: "Roboto";
    font-size: 1.2vmax;
    margin:1vmax 0.5vmax;
    margin-bottom: 0;

}
span{
    margin-left: 0.5vmax;
    margin-top: 0%.5vmax;
    color:tomato;
    font-size: 1.3vmax;
    text-decoration: none;

}

&:hover{
    box-shadow: 0 0 5px rgba(15,15,15,0.26);
    transform: translateY(-1vmax);
}

@media screen and (max-width:600px){
    p{
        font-size: 1.7vmax;
    }
    span{
        font-size: 1.5vmax;
    }
    border: 1px solid red;
}

`

const Wrap = styled.div`
width: 100%;
margin: 0.5vmax;
display: flex;
justify-content: flex-start;

span{
    margin-left: 0.5vmax;
    align-self: center;
    font:300 0.7vmax "Roboto";
}

@media screen and (max-width:600px){
    margin:0;
    display: block;
    span{
        margin:0 0.5vmax;
    }
    border: 1px solid teal;
}

`