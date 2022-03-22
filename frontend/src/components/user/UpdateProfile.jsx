import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErorrs, loadUser, login, updateProfile } from "../../store/Actions/userAction";
import Loader from "../Loader";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../store/AcrionTypes/userActionTypes';
function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.user);
  const {error,isUpdated,loading}  = useSelector((store)=>store.profile)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvtaar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  useEffect(() => {
      if(user){
          setName(user.name)
          setEmail(user.email)
          setAvatarPreview(user.profilePic.url)
      }
    if (error) {
      alert.error(error);
      dispatch(clearErorrs());
    }
    if (isUpdated) {
      alert.success("Updated SuccessFully")
      dispatch(loadUser())
      navigate("/account")
      dispatch({type:UPDATE_PROFILE_RESET})
    }
  }, [dispatch, error, alert, navigate,user,isUpdated]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);
    dispatch(updateProfile(myform));
  };
  const updateProfileDataChange = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setAvatarPreview(reader.result);
          setAvtaar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  };
  return <>
  {loading? <Loader />:<>
  <Container>
<Box>
    <h2>Update Profile</h2>
<form className="updateprofileform" 
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
          >
              <div className="updateprofilename">
                  <FaceIcon />
                  <input
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />

              </div>
              <div className="updateprofileemail">
                  <MailOutlineIcon />
                  <input type="email"
                  placeholder="Enter Your Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />

              </div>
              
              <div id="updateprofileimage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input 
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                  />

              </div>
              <input 
              type="submit"
              value="updateProfile"
              className="updateprofilebtn"
              />

          </form>
</Box>
  </Container>
  </>}
  </>
}

export default UpdateProfile;

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);


.updateprofilebtn{

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
  .updateprofileform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
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
 
  }


  @media screen and (max-width:600px) {
    background-color: white;
    
.updateprofileform{
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
#updateprofileimage{
     
     img{
       width:8vmax;
       &::file-selector-button{
height: 7vh;
padding:1.8vmax;
       }
     }
     
 }
 .updateprofilebtn{
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

