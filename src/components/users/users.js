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
    navigate(`/profile/${id}`);
  };

  return (
    <div className="usersContener">
      {allUsers &&
        allUsers.map((ele) => {
          return (
            <div key={ele._id} className="userss">
              <div className="imgContener0">
                <img className="img3" src={ele.img} alt="img"  onClick={() => {
                  goInside(ele._id);
                }} />
              </div>
              {/* <div className="imgContener">
              <img className="imgg" src={post[0].postedBy.img} />
            </div> */}

              <h4
                className="userName"
                onClick={() => {
                  goInside(ele._id);
                }}
              >
                {ele.username}
              </h4>
              <button
                className="deleteBtn2"
                onClick={() => deleteUser(ele._id)}
              >
                {" "}
                delete{" "}
              </button>
            </div>
          );
        })}

      {!allUsers.length && <h2>there is no user or you are forbidden</h2>}
    </div>
  );
};

export default Users;
