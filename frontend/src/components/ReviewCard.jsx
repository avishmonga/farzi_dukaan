import React from 'react'
import ReactStars from 'react-rating-stars-component'
import styled from 'styled-components'
function ReviewCard({review}) {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 10 : 25,
        value:review.rating,
        isHalf:true
    }
  return (
    <Wrapper>
        <img src="https://user-images.githubusercontent.com/80064807/158963039-383ee568-5e27-4f7c-ad8f-dbcbbaeca3f7.png" alt="user" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>

    </Wrapper>
  )
}

export default ReviewCard

const Wrapper = styled.div`
p{
    color: rgba(0,0,0,0.836);
    font: 600 2vmax "Roboto";
}
span{
    color: rgba(0,0,0,0.445);
    font: 300 1vmax cursive;
}
img{
    width: 8vmax;
}
`