import "./App.css";
import Header from "./components/Header";
import { Route,Routes } from "react-router-dom";
import webfont from 'webfontloader'
import { useEffect } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import ProductDetils from "./components/ProductDetils";
import Products from "./components/Products";
import LoginSignUp from "./components/user/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/Actions/userAction";
import Profile from "./components/user/Profile"
import UpdateProfile from './components/user/UpdateProfile';
function App() {
  const {isAuthenticated} = useSelector((store)=>store.user)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUser())
    webfont.load({
      google:{
        families:["Roboto","Droid Sans"]
      }
    })

  },[])
  return (
    <div className="App">
        <Header />
      <Routes>
      
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetils />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        {isAuthenticated &&  <Route path="/account" element={<Profile />}></Route>}
        {isAuthenticated &&  <Route path="/me/update" element={<UpdateProfile />}></Route>}
       


      </Routes>
    </div>
  );
}

export default App;
