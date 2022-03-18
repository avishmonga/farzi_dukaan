import "./App.css";
import Header from "./components/Header";
import { Route,Routes } from "react-router-dom";
import webfont from 'webfontloader'
import { useEffect } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import ProductDetils from "./components/ProductDetils";
import Products from "./components/Products";
function App() {
  useEffect(()=>{
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


      </Routes>
    </div>
  );
}

export default App;
