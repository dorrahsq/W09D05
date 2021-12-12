import "./App.css";
import React  from "react";
import { Route, Routes  } from "react-router-dom";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Header from "./components/header/header";
import Login from "./components/logIn/login";
import Forget from "./components/forget/forget";
import Reset from "./components/resetpass/reset";
import Post from "./components/onePost";
import Profile from "./components/profile/profile";
import Users from "./components/users/users";
import OneUser from "./components/oneUser/oneuser";
import { useSelector } from "react-redux";
import Notfound from "./components/NotFound/notfound";
import NotFoundUn from "./components/notfoundunlog/notfound";

function App() {
  const state = useSelector((state) => {
    return state;
  });

  return (
    <>
      <div className="kkk">
        <img
          alt="img"
          className="backg"
          src="https://images.pexels.com/photos/272745/pexels-photo-272745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
        <div className="bgg"></div>
        {state.signIn.token && (
          <>
            <Header />
            <Routes>
       
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/profile/:id" element={<OneUser />} />
              <Route exact path="/home/post/:id" element={<Post />} />
              <Route path="*" element={<Notfound/>}/>


            </Routes>
          </>
        )}
        {!state.signIn.token && (
          <>
            <Header />
            <Routes>
              <Route exact path="/forgetPassword" element={<Forget />} />
              <Route exact path="/resetPassword" element={<Reset />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Login />} />
              <Route path="*" element={<NotFoundUn/>}/>

            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;
