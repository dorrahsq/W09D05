import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { logOut } from "../../reducers/login";
import { useDispatch } from "react-redux";

const Header = () => {
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

              <li className="lie" >
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
                  {" "}
                  <AiOutlineLogout />
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
