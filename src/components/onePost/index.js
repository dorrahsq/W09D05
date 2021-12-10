import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";

const Post = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [post, setPost] = useState([]);
  const [newDes, setNewDes] = useState("");
  const [postInput, setPostInput] = useState(false);
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

  const deletePost = async (postId) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/posts/delete/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    navigate(`/home`);
  };

  const deleteComment = async (commentId) => {
    console.log(commentId);
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/comment/delete/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getPosts();
  };

  const updatePost = () => {
    console.log("change Bio");
    setPostInput(true);
  };

  const updatePostBack = async () => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/posts/update`,
      { newdescribe: newDes, _id: id },
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
      {post && (
        <>
          {!postInput && (
            <p className="bio">
              <h3> {post.length && post[0].describe} </h3>
              <RiPencilFill
                className="editBioIcno"
                onClick={() => {
                  updatePost();
                }}
              />
            </p>
          )}

          {postInput && (
            <>
              <input
                className="inputBio"
                type="text"
                placeholder={post[0].describe}
                onChange={(e) => {
                  setNewDes(e.target.value);
                }}
              />
              <button className="bioBtn" onClick={updatePostBack}>
                Update
              </button>
            </>
          )}

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
                    <div>
                      <h6> {ele.title} </h6>
                      <h6> {ele.by} </h6>
                      {/* comment owner and post owner and admin */}
                      {(state.signIn.userID == ele._id ||
                        state.signIn.role == "61a4e135a6502019b9898c1e" ||
                        post[0].postedBy == state.signIn.userID) && (
                        <button onClick={() => deleteComment(ele.commentId)}>
                          delete comment
                        </button>
                      )}
                    </div>
                  </>
                );
              })}
          </h5>
          <h3> </h3>

          {post.length &&
            (state.signIn.userID == post[0].postedBy ||
              state.signIn.role == "61a4e135a6502019b9898c1e") && (
              <div className="deleteBtnContener">
                <button
                  onClick={() => {
                    deletePost(post[0]._id);
                  }}
                  className="deleteBtn"
                >
                  Delete this post
                </button>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default Post;
