import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErorrs, updatePassword } from "../../store/Actions/userAction";
import Loader from "../Loader";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../store/AcrionTypes/userActionTypes';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey"
function UpdatePassword() {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {error,isUpdated,loading}  = useSelector((store)=>store.profile)
const [oldPassword,setOldPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [newPassword,setNewPassword] = useState("")
  useEffect(() => {
      
    if (error) {
      alert.error(error);
      dispatch(clearErorrs());
    }
    if (isUpdated) {
      alert.success("Updated SuccessFully")
      navigate("/account")
      dispatch({type:UPDATE_PASSWORD_RESET})
    }
  }, [dispatch, error, alert, navigate,isUpdated]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("oldPassword", oldPassword);
    myform.set("newPassword", newPassword);
    myform.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myform));
  };
 
  return (
    <>
  {loading? <Loader />:<>
  <Container>
<Box>
    <h2>Update Password</h2>
<form className="updatepasswordform" 
          encType="multipart/form-data"
          onSubmit={updatePasswordSubmit}
          >
               <div className="signuppassword">
                  <VpnKeyIcon />
                  <input type="password"
                  placeholder="Enter Your Current Password"
                  required
                  name="oldpassword"
                  value={oldPassword}
                  onChange={(e)=>setOldPassword(e.target.value)}
                  />

              </div>


              <div className="signuppassword">
                  <LockOpenIcon />
                  <input type="password"
                  placeholder="Enter Your New Password Here"
                  required
                  name="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  />

              </div>



              <div className="signuppassword">
                  <LockOpenIcon />
                  <input type="password"
                  placeholder="Confirm Your Password"
                  required
                  name="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  />

              </div>
            
              
              
              <input 
              type="submit"
              value="Change Password"
              className="updatepasswordbtn"
              />

          </form>
</Box>
  </Container>
  </>}
  </>
  )
}

export default UpdatePassword
const Container = styled.div`
  width: 100vw;
  height: 90vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);


.updatepasswordbtn{

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


  .updatepasswordform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: -5%;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 90%;
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
    
.updatepasswordform{
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

 .updatepasswordbtn{
     font: 300 1.9vmax "Roboto" ;
     padding: 1.8vmax;
 }
      
  }
  


`
const Box = styled.div`
  /* margin-top: -10%; */
  background-color: white;
  width: 35vw;
  height: 70vh;
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

