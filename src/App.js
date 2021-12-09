import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Header from "./components/header/header";
import Login from "./components/logIn/login";
import Forget from "./components/forget/forget";
import Reset from "./components/resetpass/reset";



function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route exact path="/forgetPassword" element={< Forget/>} />
      <Route exact path="/resetPassword" element={< Reset/>} />
        <Route exact path="/home" element={< Home/>} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
