import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Header from "./components/header/header";
import Login from "./components/logIn/login";
import Forget from "./components/forget/forget";
import Reset from "./components/resetpass/reset";
import Post from "./components/onePost";
import Profile from "./components/profile/profile";
import Users from "./components/users/users";

function App() {
  return (
    <>
      <div className="kkk">
        <img
          className="backg"
          src="https://images.pexels.com/photos/272745/pexels-photo-272745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
        <div className="bgg"></div>
        <Header />
        <Routes>
          <Route exact path="/forgetPassword" element={<Forget />} />
          <Route exact path="/resetPassword" element={<Reset />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/home/post/:id" element={<Post />} />
          <Route exact path="/profile/post/:id" element={<Post />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
