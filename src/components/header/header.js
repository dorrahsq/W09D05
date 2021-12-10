import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { logOut } from "../../reducers/login";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
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
          state.signIn.role == "61a4e135a6502019b9898c1e" ? (
            <ul>
              <li className="lie">
                <Link id="first" className="link" to="/usres">
                  Users
                </Link>
              </li>
              <li className="lie" id="homeNav">
                <Link className="link" to="/home">
                  Home
                </Link>
              </li>

              <li className="lie">
                <p className="link" onClick={logout}>
                  {" "}
                  <AiOutlineLogout />
                </p>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="lie" id="homeNav">
                <Link className="link" to="/home">
                  home
                </Link>
              </li>

              <li id="logOut">
                <p className="link" onClick={logout}>
                  <AiOutlineLogout />
                </p>
              </li>

              <li className="lie">
                <p className="link">
                  <div className="newPostBtn">
                    <p
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      New post
                    </p>
                  </div>
                  <Modal
                    className="modal"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="NewPostModel">
                      <Box sx={style} className="box">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <span className="newPostText">
                            {" "}
                            What's happening?{" "}
                          </span>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <input
                            className="newPostInput"
                            onChange={(e) => {
                              setDescribe(e.target.value);
                            }}
                            type="text"
                            placeholder="Write a caption"
                          />
                          <br />

                          <button
                            className="PostIt"
                            onClick={() => {
                              postIt();
                            }}
                          >
                            post it
                          </button>
                        </Typography>
                      </Box>
                    </div>
                  </Modal>
                </p>
              </li>
            </ul>
          )
        ) : (
          console.log("ggg")
        )}
      </div>
    </>
  );
};

export default Header;
