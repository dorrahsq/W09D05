import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  let navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  const [user, setuser] = useState([]);
  const [userPostss, setUserPostss] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setuser(user.data);

    const userPosts = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/userPost/${state.signIn.userID}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setUserPostss(userPosts.data);

  };

  const goInside = (id) => {
    navigate(`/home/post/${id}`);
  };

  return (
    <>
      <div>
        {user && user[0] ? (
          <>
            <div className="contenerImg">
              <div className="borderImg">
                <img className="othersImg" src={user[0].img} alt="img" />
              </div>

              <h3 className="name"> {user[0].username} </h3>
            </div>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss && (
          <>
            {userPostss.length ? (
              <div className="allImg">
                {userPostss.map((item) => (
                  <h4  key={item._id} className="profileDes" onClick={() => goInside(item._id)}>
                    {item.describe}{" "}
                  </h4>
                ))}
              </div>
            ) : (
              <p className="noPosted">You don't have any post yet ): </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Profile;
