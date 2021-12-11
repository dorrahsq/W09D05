import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Forget = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState(""); //email or user
  const [message, setMessage] = useState("");

  const restPass = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/forgetPassword`,
      { email }
    );
    if (result.status == 200) {
      //pass
      navigate(`/resetPassword`);
    } else {
      setMessage(result.data);
    }
  };
  return (
    <div>
      <input
        className="forgetInput"
        type="text"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className="forgetBtn" onClick={restPass}>
        {" "}
        send email{" "}
      </button>
      {message}
    </div>
  );
};

export default Forget;
