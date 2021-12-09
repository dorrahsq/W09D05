import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";

const Post = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [isLiked, setIsLiked] = useState(`${(<IoHeartSharp />)}`);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const post = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/onePost/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    setPost(post.data);

    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/likes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status == 201) setIsLiked(<IoHeartSharp />);
    else {
      setIsLiked(<IoHeartOutline />);
    }
  };

  const person = (userId) => {
    navigate(`/profile/${userId}`);
  };
  const commentThis = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/comment/create`,
      { title: comment, by: state.signIn.userID, onPost: id },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getPosts();
  };

  const like = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/likes/`,
      { by: state.signIn.userID, onPost: id },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    if (result.status == 201) setIsLiked(<IoHeartSharp />);
    else {
      setIsLiked(<IoHeartOutline />);
    }
    getPosts();
  };

  return (
    <>
      {post && (
        <>
          <h3> {post.length && post[0].describe} </h3>
          <h4>
            <span onClick={like}> {isLiked} </span>
            {post.length && post[1].likes}
          </h4>
          <h5>
            comments:
            <input
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button onClick={commentThis}> reply </button>
            {post.length &&
              post[2].map((ele) => {
                return (
                  <>
                    <h6> {ele.title} </h6>
                    <h6> {ele.by} </h6>
                  </>
                );
              })}
          </h5>
          <h3> </h3>
        </>
      )}
    </>
  );
};

export default Post;
