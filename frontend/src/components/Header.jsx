import React, { useState } from 'react'
import styled  from 'styled-components';
import { BsCart } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import{Link} from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate()
    function searchSubmitHandler(keyword){
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate(`/products`)
        }

    }
    const [keyword,setKeyword] = useState("")
  return (
    <>
    <Container>
        <h1>Farzi Dukaan</h1>

        <ul className='pages'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><a href="">About</a></li>
        </ul>
        <Search>
            <input onChange={(e)=>{
                setKeyword(e.target.value)
            }} placeholder="Search Here" type="text" /> 
            <AiOutlineSearch onClick={()=>{
                searchSubmitHandler(keyword)
            }}  size = {30} />
            
        </Search>

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
const Search = styled.div`
display: flex;
width:20%;
input{
    width:100%;
    border-radius: 10px;
    border: none;
    margin-right: 10px;
    box-sizing: border-box;
    font-size: 20px;
    padding-left: 10px;
    color:rgba(0,0,0,0.768);
    &:focus{
        outline: none;
    }
}

`