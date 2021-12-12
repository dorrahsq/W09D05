import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { logIn } from "../../reducers/login";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

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
    if (users.status !== 200) {
      setMessage(users.data);
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

  const responseSGoogle = async (responce) => {
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
  };
  const responseFGoogle = (res) => {
    console.log(res);
  };

  return (
    <>
      <div className="describeItem">
        <span className="Logg">Log in </span>
        <div>
          <input
            type="text"
            placeholder=" email or username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <input
          type="password"
          placeholder=" password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <h6 className="forgetPass" onClick={navForget}>
          {" "}
          forget password?{" "}
        </h6>
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
          Don't have an account?{" "}
          <Link className="linkk" to="/signup">
            Sign up{" "}
          </Link>
        </div>
        <GoogleLogin
          clientId="327598702368-71q772rq30088rg2euni7m785hcivq0n.apps.googleusercontent.com" //dotenv -----
          buttonText="Sign in with google"
          onSuccess={responseSGoogle}
          onFailure={responseFGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="mesageL">{message} </div>
      </div>
    </>
  );
};

export default Login;
