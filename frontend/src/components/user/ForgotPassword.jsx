import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErorrs, forgotPassword } from "../../store/Actions/userAction";
import Loader from "../Loader";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import MailOutlineIcon  from '@mui/icons-material/MailOutline';
function ForgotPassword() {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {error,message,loading}  = useSelector((store)=>store.forgotPassword)
const [email,setEmail] = useState("")

  useEffect(() => {
      
    if (error) {
      alert.error(error);
      dispatch(clearErorrs());
    }
    if (message) {
      alert.success(message)
    }
  }, [dispatch, error, alert, message]);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("email", email);
    dispatch(forgotPassword(myform));
  };
 
  return (
    <>
  {loading? <Loader />:<>
  <Container>
<Box>
    <h2>Forgot Password</h2>
<form className="forgotpasswordform" 
          onSubmit={forgotPasswordSubmit}
          >
               
               <div className="forgotpasswordemail">
                  <MailOutlineIcon />
                  <input type="email"
                  placeholder="Enter Your Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />

              </div>
              
              
              <input 
              type="submit"
              value="Change Password"
              className="forgotpasswordbtn"
              />

          </form>
</Box>
  </Container>
  </>}
  </>
  )
}

export default ForgotPassword
const Container = styled.div`
  width: 100vw;
  height: 90vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);


.forgotpasswordbtn{

    border: none;
    background-color: tomato;
    color:white;
    width:100%;
    font:300 0.8vmax "Roboto";
    padding: 0.8vmax;
    cursor:pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.219);

    &:hover{
        background-color: rgb(179,66,46);
    }



  }


  .forgotpasswordform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: -5%;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 40%;
    transition: all 0.5s;
img{
    width: 10vmax;
}
    div {
      display: flex;
      width: 100%;
      align-items: center;

      input{
          padding: 1vmax 4vmax;
          padding-right: 1vmax;
          width:100%;
          box-sizing: border-box;
          border: 1px solid rgba(0,0,0,0.267);
          border-radius: 4px;
          font: 300 0.9vmax cursive "Roboto";
          outline: none;

      }

      svg{
          position:absolute;
          transform: translateX(1vmax);
          font-size: 1.6vmax;
          color:rgba(0,0,0,0.623);
      }

    }
    a{
        color:rgba(0,0,0,0.651);
        text-decoration: none;
        align-self: flex-end;
        transition: all 0.5s;
        font: 500 1.2vmax "Gill Sans";

        &:hover{
            color:black;
        }
    }
  }
 


  @media screen and (max-width:600px) {
    background-color: white;
    
.forgotpasswordform{
    padding:5vmax;
    div{

        input{
            padding:2.5vmax 5vmax;
            font:300 1.7vmax cursive;
        }
        svg{
            font-size:2.8vmax;
        }
    }
    a{
        font-size: 2vmax;
    }
}

 .forgotpasswordbtn{
     font: 300 1.9vmax "Roboto" ;
     padding: 1.8vmax;
 }
      
  }
  


`
const Box = styled.div`
  /* margin-top: -10%; */
  background-color: white;
  width: 35vw;
  height: 50vh;
  padding-top: 4%;
  box-sizing: border-box;
  overflow: hidden;
  @media screen and (max-width:600px) {
width:100vw;
height: 95vh;
  }
  h2{
      text-align: center;
      color: rgba(0,0,0,0.664);
      font:400 1.3vmax "Roboto";
      padding: 1.3vmax;
      border-bottom: 1px solid rgba(0,0,0,0.205) ;
      width: 50%;
      margin: auto;
  }
`;

