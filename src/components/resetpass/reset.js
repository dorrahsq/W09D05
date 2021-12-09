import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

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
    <div>
      reset
      <input
        type="text"
        placeholder="code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="new pass"
        onChange={(e) => {
          setNewPass(e.target.value);
        }}
      />
      <button onClick={restPass}> send email </button>
      {message}
    </div>
  );
};

export default Reset;
