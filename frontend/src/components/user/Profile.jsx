import React, { useEffect } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const {user,loading,isAuthenticated} = useSelector((store)=>store.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isAuthenticated){

      navigate("/login")

    }
  },[isAuthenticated,navigate])
  return (
    <>
    {loading?<Loader />:<>
    <Container>
      <div className='first'>
        <h1>My Profile</h1>
        {user?<img src={user.profilePic.url} alt={user.name} /> :<></>}
        
        <Link to="/me/update" >Edit Profile</Link>
      </div>
      <div className='second'>
      <div>
        <h4>Full Name</h4>
        <p>{user.name}</p>
      </div>
      <div>
        <h4>Email</h4>
        <p>{user.email}</p>
      </div>
      <div>
        <h4>Joined On</h4>
        <p>{String(user.createdAt).substr(0,10)}</p>
      </div>
      <div>
        <Link to="/orders">My Orders</Link>
        <Link to="/password/update">Change Password</Link>
      </div>
      </div>


    </Container>
    </>}
    </>
  )
}

export default Profile
const Container = styled.div`
display: flex;
width: 100vw;
height: 100vh;
max-width: 100%;
background-color: white;



  
.first{
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;
  margin-left: 5vmax;
  h1{
    color: rgba(0,0,0,0.555);
    font:500 2.2vmax "Roboto";

  }
  img{
    width: 20vmax;
    border-radius: 100%;
    transition: all 0.5s;
  }
  a{
    border: none;
    background-color: tomato;
    font:400 1vmax "Roboto";
    color: white;
    text-decoration: none;
    width: 40%;
    padding: 0.5vmax;
    margin: 4vmax;
    text-align: center;
    transition: all 0.5s;
    border-radius: 10px;

  }
}

.second{
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  margin-top: 5%;
  flex-direction: column;
  
  align-items: flex-start;
  padding: 5vmax;
  box-sizing: border-box;
  div{
    margin: 1vmax;
    p{
      color: rgba(0, 0, 0, 0.418);
  font: 400 1vmax "Roboto";
  margin: 0.2vmax;
    }
  }
  h4{
    color: black;
  font: 400 1.2vmax "Roboto";
  }
  div:last-child{
    display: flex;
  flex-direction: column;
  width: 60%;
  a{
    order: none;
  background-color: rgb(68, 68, 68);
  font: 400 1vmax "Roboto";
  color: white;
  text-decoration: none;
  padding: 0.5vmax;
  text-align: center;
  transition: all 0.5s;
  margin: 1vmax 0;
  }
  }
}

`