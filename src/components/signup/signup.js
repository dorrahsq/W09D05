import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { logIn } from "../../reducers/login";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

const Signup = () => {
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const users = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/create`,
      { email, username, password, role: "61a4e07ba6502019b9898c1c" }
    );
    if (users.status == 204) {

      setMessage(
        "this email or username already hava an account! log in or change your data"
      );
    } else if (users.status == 210) {
      setMessage("you need to insert a complix password");
    } else {

      setMessage(users.data);
      // const data = {
      //   role: users.data.result.role,
      //   token: users.data.token,
      //   userID: users.data.result._id,
      // };
      // dispatchEvent(logIn(data));
      // navigate(`/home`);
    }
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
        <span className="Logg">sign up </span>
        <input
          type="text"
          placeholder=" email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder=" password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="LogBtn"
          onClick={() => {
            getUser();
          }}
        >
          <BsFillArrowRightCircleFill className="goIcon" />
        </button>
        <div className="already">
          already have an account?{" "}
          <Link className="linkk" to="/">
            log in{" "}
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

export default Signup;
