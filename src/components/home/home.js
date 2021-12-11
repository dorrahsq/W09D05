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
  };
  const goInside = (PostId) => {
    navigate(`post/${PostId}`);
  };
  const person = (userId) => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div className="home">
      {/* <img
        className="backg"
        src="https://images.pexels.com/photos/272745/pexels-photo-272745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <div className="bgg"></div> */}
      <h1 className="firstHead">Welcome to the best social media platform</h1>
      <h5 className="secHead">
        See what’s happening and what people are talking about right now!{" "}
      </h5>
      <button>
        {" "}
        <a href="#gotothesecondpage"> GET STARTED </a>{" "}
      </button>

      <h2 id="gotothesecondpage"> Time line</h2>
      {!post.length ? (
        <h2> loading ... </h2>
      ) : (
        <div className="anim">
          {post.map((ele) => {
            return (
              <div className="post" key={ele._id}>
                <div className="imgContener">
                  <img className="imgg" src={ele.postedBy.img} />{" "}
                </div>
                <p onClick={() => person(ele.postedBy._id)} className="by">
                  {" "}
                  {ele.postedBy.username}{" "}
                </p>
                <h3 className="describe" onClick={() => goInside(ele._id)}>
                  {ele.describe}
                </h3>
              </div>
            );
          })}
          {text}
          <div className="marginB"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
