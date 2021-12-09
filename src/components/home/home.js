import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const Home = () => {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [post, setPosts] = useState("");
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/`, {
      headers: {
        Authorization: `Bearer ${state.signIn.token}`,
      },
    });
    setPosts(posts.data);
    console.log(posts.data);
  };
  const goInside = (PostId) => {
    navigate(`post/${PostId}`);
  };

  return (
    <div className="home">
      <h2> Time line</h2>
      {!post.length ? (
        <h2> you dont have any tasks</h2>
      ) : (
        <div className="anim">
          {post.map((ele) => {
            return (
              <div key={ele._id}>
                <h3 onClick={() => goInside(ele._id)}> {ele.describe} </h3>
                <h6> {ele.postedBy.username} </h6>
              </div>
            );
          })}
          {text}
        </div>
      )}
    </div>
  );
};

export default Home;
