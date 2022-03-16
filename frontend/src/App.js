import "./App.css";
import Header from "./components/Header";
import { Route,Routes } from "react-router-dom";
import webfont from 'webfontloader'
import { useEffect } from "react";
import Home from "./components/Home";
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

      </Routes>
    </div>
  );
}

export default App;
