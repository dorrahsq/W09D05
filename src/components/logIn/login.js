import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { logIn } from "../../reducers/login";
import { useDispatch } from "react-redux";
const Login = () => {
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [email, setEmail] = useState(""); //email or user
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const getUser = async () => {
    const users = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/log`,
      { input:email, password }
    );
    console.log(users);
    if (users.status == 206) {
      setMessage("invalid email or password")}
    else if(users.status == 203){
      setMessage("Your Email has not been verified")
      }
     else {
      const data = {
        role: users.data.result.role,
        token: users.data.token,
        userID: users.data.result._id,
      };
      dispatchEvent(logIn(data));
      navigate(`/home`);
    }
  };

  const navForget  = () =>{
    navigate(`/forgetPassword`);
  }

  const restPass = async()=>{
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/forgetPassword`,
      { email }
    ); 
console.log(result.data);
  setMessage(result.data)

  }

  return (
    <>
      <div className="describeItem">
        <span className="Logg">Log in </span>
        <input
          type="text"
          placeholder=" email or username"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder=" password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
           <h6 onClick={navForget}> forget password? </h6>
            {/* <h6 onClick={restPass}> forget password? </h6> */}
        <button
          className="LogBtn"
          onClick={() => {
            getUser();
          }}
        >
          <BsFillArrowRightCircleFill className="goIcon" />
        </button>
        <div className="already">
          Don't have an account? <Link to="/signup">Sign up </Link>
        </div>

        <div className="mesageL">{message} </div>
      </div>
    </>
  );
};

export default Login;
