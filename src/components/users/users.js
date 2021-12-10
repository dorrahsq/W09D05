import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";

const Users = () => {
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  const getAllUsers = async () => {
    const users = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/all`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setAllUsers(users.data);
    console.log(users.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/user/delete/?_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getAllUsers();
  };

  const goInside = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <>
      {allUsers &&
        allUsers.map((ele) => {
          return (
            <div className="userss">
              <h4
                onClick={() => {
                  goInside(ele._id);
                }}
              >
                - {ele.username}
              </h4>
              <button onClick={() => deleteUser(ele._id)}> delete </button>
            </div>
          );
        })}

      {!allUsers.length && <h2>there is no user or you are forbidden</h2>}
    </>
  );
};

export default Users;
