import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { logOut } from "../../reducers/login";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Header = () => {
  const [describe, setDescribe] = useState("initialState");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();

  const state = useSelector((state) => {
    return state;
  });

  const logout = () => {
    const data = {
      role: "",
      token: "",
      userID: "",
    };
    dispatchEvent(logOut(data));
    navigate(`/`);
  };
  const postIt = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/posts/create`,
      { describe: describe, postedBy: state.signIn.userID },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    window.location.reload(false);
  };
  return (
    <>
      <div className="nav">
        {state.signIn.token.length !== 0 ? (
          <ul>
            {state.signIn.role === "61a4e135a6502019b9898c1e" && (
              <li className="lie">
                <Link id="first" className="link" to="/users">
                  Users
                </Link>
              </li>
            )}
            <li className="lie" id="homeNav">
              <Link className="link" to="/home">
                Home
              </Link>
            </li>
            <li className="lie" id="homeNav">
              <Link className="link" to="/profile">
                Profile
              </Link>
            </li>


            <li className="lie">
              <span className="link" onClick={logout}>
                {" "}
                <AiOutlineLogout />
              </span>
            </li>
          </ul>
        ) : (
          console.log("ggg")
        )}
      </div>
    </>
  );
};

export default Header;
