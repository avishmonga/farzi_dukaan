import React, { useRef, useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { clearErorrs,login } from "../../store/Actions/userAction";
import Loader from "../Loader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face"
import { useAlert } from 'react-alert';
function LoginSignUp() {
    const alert = useAlert()
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const dispatch = useDispatch()
  const { loading,error } = useSelector((store) => store.user);
  useEffect(()=>{
      if(error){
          alert.error(error)
          dispatch(clearErorrs())
      }

  },[dispatch,error,alert])

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user,setUser] = useState({
      name:"",
      email:"",
      password:""
  })
  const {name,email,password} = user;
  const [avtaar,setAvtaar] = useState()
  const [avatarPreview,setAvatarPreview] = useState("/Profile.png")


  const loginSubmit = (e) => {
      e.preventDefault()
    dispatch(login(loginEmail,loginPassword))
  };

  const switchTab = (e, tab) => {
    if (tab == "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralRegister");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab == "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");

      registerTab.current.classList.add("shiftToNeutralRegister");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const registerSubmit = (e)=>{
      e.preventDefault()
      const myform = new FormData()
      myform.set("name",name)
      myform.set("email",email)
      myform.set("password",password)
      console.log("SignUp Submit");
  }
  const registerDataChange = (e)=>{
      if(e.target.name=="avatar"){
          const reader = new FileReader()
          reader.onload=()=>{
              if(reader.readyState==2){
                  setAvatarPreview(reader.result)
                  setAvtaar(reader.result)
              }
          }
          reader.readAsDataURL(e.target.files[0])

      }else{
          setUser({...user,[e.target.name]:e.target.value})
      }
  }

  
  return (
    <>
      <Container>
        <Box>
          <ToggleBox>
            <Toggle>
              <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
            </Toggle>
            <button ref={switcherTab}></button>
          </ToggleBox>
          <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
            <div className="login-email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Enter Your Email Here"
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                required
                placeholder="Enter Your Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/forgot/password">Reset Password</Link>

            <input type="submit" value="Login" className="loginbtn" />
          </form>
          <form className="signupform" ref={registerTab}
          encType="multipart/form-data"
          onSubmit={registerSubmit}
          >
              <div className="signupname">
                  <FaceIcon />
                  <input
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  />

              </div>
              <div className="signupemail">
                  <MailOutlineIcon />
                  <input type="email"
                  placeholder="Enter Your Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  />

              </div>
              <div className="signuppassword">
                  <LockOpenIcon />
                  <input type="password"
                  placeholder="Enter Your Password Here"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  />

              </div>
              <div id="signupimage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input 
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  />

              </div>
              <input 
              type="submit"
              value="Register"
              className="signupbtn"
              />

          </form>
        </Box>
      </Container>
    </>
  );
}

export default LoginSignUp;

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);


  .loginbtn,.signupbtn{

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
.signupform{
    transform: translateY(-100%) translateX(-100vmax);
}
#signupimage{
    align-items: center;
    img{
        width:3vmax;
    border-radius: 100%;
    margin-right: 4px;
    }
    input{
        display: flex;
    padding:0;

    &::file-selector-button{
        cursor:pointer;
        width: 100%;
        height: 7vh;
        z-index: 2;
        margin: 0;
        border: none;
        font: 400 1vmax cursive "Roboto";
        transition: all 0.5s;
        padding: 0 1vmax;
        color:rgba(0,0,0,0.623);
        background-color: rgb(255,255,255);

        &:hover{
            background-color: rgb(235,235,235);
        }



    }
    }
  
    
}
  .loginform,
  .signupform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;

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
  .shiftToLeft{
      transform: translateX(-100%);

  }

  .shiftToRight{

    transform: translateX(100%);
  }
  .shiftToNeutral{

    transform: translateX(0%);

  }
  .shiftToNeutralRegister{
    transform: translateX(0%) translateY(-100%);

  }


  @media screen and (max-width:600px) {

    background-color: white;
.loginform,.signupform{
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
#signupimage{
     
     img{
       width:8vmax;
       &::file-selector-button{
height: 7vh;
padding:1.8vmax;
       }
     }
     
 }
 .loginbtn,.signupbtn{
     font: 300 1.9vmax "Roboto" ;
     padding: 1.8vmax;
 }
      
  }
  


`;
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
`;
const ToggleBox = styled.div`
  button {
    background-color: tomato;
    height: 3px;
    width: 50%;
    border: none;
    transition: all 0.5s;
  }
`;
const Toggle = styled.div`
  display: flex;
  height: 3vmax;


  p {
    color: rgba(0, 0, 0, 0.678);
    font: 300 1vmax "Roboto";
    transition: all 0.5s;
    cursor: pointer;
    display: grid;
    place-items: center;
    width: 100%;
    &:hover {
      color: tomato;
    }
  }
  @media screen and (max-width:600px) {
height: 5vmax;
p{
    font:300 1.5vmax "Roboto";
}

  }
`;
