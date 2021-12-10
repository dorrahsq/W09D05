import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { logIn } from "../../reducers/login";
import { useDispatch } from "react-redux";
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [email, setEmail] = useState(""); //email or user
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const getUser = async () => {
    const users = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/log`,
      { input: email, password }
    );
    console.log(users);
    if (users.status == 206) {
      setMessage("invalid email or password");
    } else if (users.status == 203) {
      setMessage("Your Email has not been verified");
    } else {
      const data = {
        role: users.data.result.role,
        token: users.data.token,
        userID: users.data.result._id,
      };
      dispatchEvent(logIn(data));
      navigate(`/home`);
    }
  };

  const navForget = () => {
    navigate(`/forgetPassword`);
  };


  const google = async () => {
    console.log("google");
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/google`
    );
    console.log(result.data);
  };

  const responseSGoogle = async(responce)=>{
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/googlelogin`,
      { idToken: responce.tokenId }
    );

    const data = {
      role: result.data.user.role,
      token: result.data.token,
      userID: result.data.user._id,
    };
    dispatchEvent(logIn(data));
    navigate(`/home`);

    console.log((result));
  }
  const responseFGoogle =(res)=>{
    console.log((res));
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
        <div onClick={google} className="already">
          Sign up with google
        </div>


        <GoogleLogin
    clientId="327598702368-71q772rq30088rg2euni7m785hcivq0n.apps.googleusercontent.com" //dotenv -----
    buttonText="Login"
    onSuccess={responseSGoogle}
    onFailure={responseFGoogle}
    cookiePolicy={'single_host_origin'}
  />,



        <div className="mesageL">{message} </div>
      </div>
    </>
  );
};

export default Login;
