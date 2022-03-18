import React, { useEffect } from 'react'
import styled  from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../store/Actions/ProductAction';
import {useParams} from "react-router-dom"
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from "./Loader"
import { useAlert } from 'react-alert';
import {clearErrors} from '../store/Actions/ProductAction'
function ProductDetils() {
    const alert= useAlert()
    const id = useParams()
    console.log(id.id)
    const dispatch = useDispatch()
    const {product,loading,error} = useSelector(state=>state.productDetail)
    useEffect(()=>{
        if(error){
             alert.error(error)
             dispatch(clearErrors())
        }
        dispatch(getProductDetail(id.id))

    },[dispatch,id,error,alert])
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 10 : 25,
        value:product.ratings,
        isHalf:true
    }
  return (
    <>
    {loading?<Loader />:<>
    <LeftWrapper>
        <ImgWrapper>
            <Carousel className='caraouseldiv'>
                {product.image && product.image.map((item,i)=>(
                    <img className='carouselimage' key={item._id} src={item.url} alt={`${i} slide`} />
                ))}
            </Carousel>
        </ImgWrapper>
        <Block>

            <Block1>
            <h2>{product.name}</h2>
            <p>product #{product._id}</p>

            </Block1>
            <Block2>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews )</span>
            </Block2>
            <Block3>
                <h1>₹{product.price}</h1>
                <Block31>
                    <Block311>
                        <button>-</button>
                        <input value={1} type="number" />
                        <button>+</button>
                    </Block311>
                    <button>Add to Cart</button>

                </Block31>
                <p>status:
                    <b className={product.stock < 1 ? "redcolor": "greencolor"}>
                    {product.stock < 1 ? "OutOfStock": "InStock"}
                    </b>
                </p>
            </Block3>

            <Block4>
            Description: <p>{product.description}</p>
            </Block4>

            <button className='submitreview'>Submit Review</button>

         

        </Block>

    </LeftWrapper>
    <Wrapper>
        <h3>REVIEWS</h3>
        
            {product.reviews && product.reviews[0]?(

                <div className='reviewcardstyle'>
                    {product.reviews && product.reviews.map((review)=><ReviewCard review = {review} />)}
                </div>

            ):(
                <p className='noreviews'>No Reviews Yet</p>
            )}
    </Wrapper>
    
    </>}
    </>
  )
}

export default ProductDetils

const LeftWrapper = styled.div`
width:100%; 
max-width: 100%;
 padding: 6vmax; 
box-sizing: border-box;
> div{
    width: 100%;
    
}

display: flex;

@media screen and (max-width:600px) {
    flex-direction: column;
    >div:last-child{
        align-items: center;
    }
}
`
const ImgWrapper = styled.div`
width: 100%;
height: 100%;
.caraouseldiv{
    align-items: center;
    button{
        z-index: 1;
    }
}
.carouselimage{
    width: 100%;
}
`

const Block = styled.div`
display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 2vmax;
    box-sizing: border-box; 
.submitreview{
    border: none;
    background-color: tomato;
    font: 500 1vmax "Roboto";
    border-radius: 20px;
    padding: 0.6vmax 2vmax;
    margin: 1vmax 0;
    color: white;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
    &:hover{
        background-color: rgba(214,84,70);
        transform: scale(1.1);
    }
}
@media screen and (max-width:600px) {
    .submitreview{
        font: 500 1.7vmax "Roboto";
        padding: 1.5vmax;
        width: 20vmax;
        margin: 3vmax 0;
    }
}

`

const Block1 = styled.div`
h2{
    color:rgb(54,54,54);
    font: 600 1.6vmax "Roboto";
}
p{
    color:rgb(54,54,54,0.582);
    font: 200 0.8vmax cursive;
}
@media screen and (max-width:600px) {
h2{
    text-align: center;
    font-size: 2.8vmax;

}
p{
    text-align: center;
    font-size:1vmax;
}
}
`
const Block2 = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
border-top: 1px solid rgba(0,0,0,0.205);
border-bottom: 1px solid rgba(0,0,0,0.205);
width:70%;
padding:1vmax 0;
span{
    color:rgb(54,54,54,0.582);
    font: 200 0.6vmax cursive;
}
@media screen and (max-width:600px) {
justify-content: center;
span{
    font-size: 1.5vmax;

}
}
`
const Block3 = styled.div`
width:70%;
h1{
    color:rgb(17,17,17,0.795);
    font: 400 1.8vmax "Franklin Gothic Medium";
    margin: 1vmax 0;
}
p{
    border-top: 1px solid rgba(0,0,0,0.205);
    border-bottom: 1px solid rgba(0,0,0,0.205);
    padding:1vmax 0;
    color:rgba(0,0,0,0.651);
    font:400 1vmax "Roboto";
    margin: 1vmax 0;
}
@media screen and (max-width:600px) {
    h1{
        font:700 3vmax "Franklin Gothic Medium";
        text-align: center;
    }
    p{
        padding: 2.5vmax 0;
        text-align: center;
        font: 200 2vmax "Roboto";

    }
}
`
const Block31 = styled.div`
display: flex;
align-items: center;
>button{
    border: none;
    cursor: pointer;
    color:white;
    width: 40%;
    transition: all 0.5s;
    background-color: tomato;
    font: 500 1.3vmax "Roboto";
    
    border-radius:20px;
    padding: 0.5vmax 2vmax;
    margin: 1vmax;
    outline: none;

    &:hover{
        background-color: rgba(214,84,70);
    }
    

}

@media screen and (max-width:600px) {
flex-direction: column;
>button{
    font: 500 1.7vmax "Roboto" ;
    padding: 1.5vmax;
    width: 20vmax;
    margin: 3vmax 0;
}
    }


`
const Block311 = styled.div`
input{
    border:none;
    padding:0.5vmax;
    width:5vmax;
    text-align: center;
    outline: none;
    color:black;

    font:400 1vmax "Roboto";
}
button{
    border: none;
    background-color: rgba(0,0,0,0.616);
    padding: 0.5vmax;
    cursor:pointer;
    color:white;
    transition: all 0.5s;
    &:hover{
        background-color: rgba(0,0,0,0.767);
    }
}
@media screen and (max-width:600px) {
padding: 2vmax 0;
button{
    padding: 1.2vmax;
    width: 4vmax;
}
input{
    padding: 1.5vmax;
    width: 3vmax;
    font:400 1.8vmax "Roboto";
}
    }
`
const Block4 = styled.div`

color:rgba(0,0,0,0.897);
font:500 1.2vmax "sans-serif";
p{
    color:rgba(0,0,0,0.534);
    font:300 1vmax "sans-serif";
}
@media screen and (max-width:600px) {
font:500 2.5vmax "sans-serif"
p{
    font:300 1.8vmax "sans-serif"
}
}

`

const Wrapper = styled.div`

h3{

    color: rgba(0,0,0,0.226);
    font: 600 1.4vmax "Roboto";
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,0.226);
    padding:1vmax;
    width: 20vmax;
    margin: auto;
    margin-bottom: 4vmax;

}
.reviewcardstyle{
    flex: none;
    box-shadow:0 0 5px rgba(0,0,0,0.226);
    border: 1px solid rgba(56,56,56,0.116);
    width: 30vmax;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1vmax;
    padding: 3vmax;
    text-align: center;
    display: flex;
    overflow: auto;

}
.noreviews{
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: rgba(0,0,0,0.548);
}

`