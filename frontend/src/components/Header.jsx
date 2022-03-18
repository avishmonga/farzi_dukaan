import React from 'react'
import styled  from 'styled-components';
import { BsCart } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
function Header() {
  return (
    <>
    <Container>
        <h1>Farzi Dukaan</h1>

        <ul className='pages'>
            <li><a href="">Home</a></li>
            <li><a href="">Products</a></li>
            <li><a href="">About</a></li>
        </ul>

        <Icons>
            <li><a href=''><BsCart size={"30"} /></a></li>
            <li><a href=''><CgProfile size={"30"} /></a></li>
        </Icons>

    </Container>
    </>
  )
}

export default Header

const Container  = styled.div`
background-color: tomato;
align-items: center;
color: white;
width: 100%;
padding: 1.5vmax;
display: flex;
justify-content: space-between;
h1{
    margin-left: 30px;
}
.pages{
    width:25%;
    align-self: center;
    list-style: none;
    display: flex;
    justify-content: space-between;

    }

    
    li{
        height: 30px;

        box-sizing: border-box;

        a{
        text-decoration: none;
        font-size: 24px;
        color: white;
    }

}


`
const Icons = styled.ul`
width:7%;
align-items: center;
margin-right: 30px;
    align-self: center;
    list-style: none;
    display: flex;
    justify-content:space-between;
`