import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const Reset = () => {
  let navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");

  const restPass = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/resetPassword`,
      { resetLink: code, newPassword: newPass }
    );
    if (result.status == 200) {
      navigate(`/`);
    } else {
      setMessage(result.data);
    }
  };

  return (
    <div className="resetContener">
      Code
      <input
        className="resetInput"
        type="text"
        placeholder="code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <br />
      New password
      <input
        className="resetInput"
        type="password"
        placeholder="new pass"
        onChange={(e) => {
          setNewPass(e.target.value);
        }}
      />
      <br />
      <button className="resetBtn" onClick={restPass}>
        {" "}
        Reset{" "}
      </button>
      {message}
    </div>
  );
};

export default Reset;
