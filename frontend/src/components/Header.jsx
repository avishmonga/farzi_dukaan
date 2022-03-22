import React, { useState,useEffect } from 'react'
import styled  from 'styled-components';
import { BsCart } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import{Link} from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
//meterial UI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { positions } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { logout } from '../store/Actions/userAction';
function Header() {
    const navigate = useNavigate()
    const alert= useAlert()
    const { isAuthenticated, user } = useSelector((store) => store.user);
    const dispatch = useDispatch()
    function searchSubmitHandler(keyword){
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate(`/products`)
        }

    }
    useEffect(()=>{

    },[isAuthenticated])
    const [keyword,setKeyword] = useState("")
    //material UI
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
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

            {/* <li><a href=''><CgProfile size={"30"} /></a></li> */}
            <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            
            <img className='profile-pic' src = { isAuthenticated?user.profilePic.url? user.profilePic.url : "./Profile.png":"./Profile.png" } /> 
            
            {/* <Avatar sx={{ width: 32, height: 32 }}></Avatar> */}
          </IconButton>
        </Tooltip>
      {/* </Box> */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          {isAuthenticated?
          <>

          
          
          
          <MenuItem onClick={()=>{
               navigate(`/account`)
          }}>
            <ListItemIcon>
            <Avatar sx={{fontSize:28}} />
            </ListItemIcon>Profile
        </MenuItem>
        {user.role=="admin"?<MenuItem onClick={()=>{
              navigate(`/admin/dashboard`)
          }}>
            <ListItemIcon>
            <DashboardIcon sx={{fontSize:28}} />
            </ListItemIcon>Dashboard
        </MenuItem>:<></>}
          <MenuItem onClick={()=>{
              navigate(`/orders`)
          }}>
           <ListItemIcon>
            <AssignmentRoundedIcon sx={{fontSize:28}} />
          </ListItemIcon>
          Orders
        </MenuItem>
       
        <Divider />
        <MenuItem  onClick={()=>{
                dispatch(logout())
                alert.success("Logout Successfully")
                
            }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </>:<><MenuItem onClick={()=>{
                 navigate(`/login`)
            }}>
          <ListItemIcon>
            <Login  fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
        </>}
        
      </Menu>
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
max-width: 100%;
padding: 1.5vmax;
display: flex;
justify-content: space-between;
width:100%;
.profile-pic{
  width: 40px;
  border-radius: 100%;
  align-self: center;
}
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