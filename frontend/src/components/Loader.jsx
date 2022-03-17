import React from 'react'
import styled from 'styled-components'
function Loader() {
  return (
    <LoadingWrap>
        <div></div>
    </LoadingWrap>
  )
}

export default Loader

const LoadingWrap = styled.div`
width:100vw;
height: 100vh;
background-color: white;
display: grid;
place-items: center;
div{
    width: 10vmax;
    border-bottom: 5px solid rgba(110,110,110);
    height: 10vmax;
    border-radius: 50%;
    animation: loadingRotate 800ms linear infinite;
    @keyframes loadingRotate  {
    to{
        transform: rotateZ(-360deg);
    }
}
}
`
