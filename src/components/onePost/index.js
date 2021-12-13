import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri";

const Post = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [post, setPost] = useState([]);
  const [newDes, setNewDes] = useState("");
  const [postInput, setPostInput] = useState(false);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [isLiked, setIsLiked] = useState(`${(<IoHeartSharp />)}`);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
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
    if (result.status === 201) setIsLiked(<IoHeartSharp />);
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
    if (result.status === 201) setIsLiked(<IoHeartSharp />);
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
    navigate(-1);
  };

  const deleteComment = async (commentId) => {
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
    getPosts();
    setPostInput(false);
  };

  const updateComment = async (commentid) => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/comment/update`,
      { title: newComment, _id: commentid },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    getPosts();
  };

  return (
    <div className="contener">
      {post && post.length && (
        <>
          <div className="post2">
            <h4>
              <span className="likes" onClick={like}>
                {isLiked}
              </span>
              {post.length && <span className="likes2"> {post[1].likes} </span>}
            </h4>
            <div className="imgContener">
              <img className="imgg" src={post[0].postedBy.img} alt="img" />
            </div>
            <p onClick={() => person(post[0].postedBy._id)} className="by">
              {" "}
              {post[0].postedBy.username}{" "}
            </p>
          </div>

          {post[0].postedBy._id !== state.signIn.userID && (
            <h3 id="postDe2" className="des">
              {" "}
              {post.length && post[0].describe}{" "}
            </h3>
          )}

          {post[0].postedBy._id === state.signIn.userID && (
            //   thats mean the user is the owner
            <>
              {!postInput && (
                <div className="des">
                  <h3 id="postDe" className="des">
                    {post.length && post[0].describe}{" "}
                  </h3>
                  <RiPencilFill
                    className="editBioIcno"
                    onClick={() => {
                      updatePost();
                    }}
                  />
                </div>
              )}
              {postInput && (
                <div className="des">
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
                </div>
              )}
            </>
          )}
          {post[0].img && <img className="imggg" src={post[0].img} alt="img" />}

          <h5 className="des">
            <span className="comment"> comments </span>
            <input
              className="commentInput"
              placeholder="write your comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  commentThis();
                }
              }}
            />
            {/* <button className="commentBtn" onClick={commentThis}> reply </button> */}
            {post.length &&
              post[2].map((ele, i) => {
                return (
                  <div key={i}>
                    <div className="postContent">
                      <img onClick={()=>person(ele._id)} className="imgg2" src={ele.img} alt="img" />
                      <p onClick={()=>person(ele._id)} className="commentBy"> {ele.by} </p>
                      <br />
                      <h6  className="commentTitle"> {ele.title} </h6>

                      {/* comment owner, post owner and admin */}
                      {(state.signIn.userID === ele._id ||
                        state.signIn.role === "61a4e135a6502019b9898c1e" ||
                        post[0].postedBy._id === state.signIn.userID) && (
                        <RiDeleteBin6Fill
                          className="deleteComment"
                          onClick={() => deleteComment(ele.commentId)}
                        />
                      )}
                      {state.signIn.userID === ele._id && (
                        <>
                          <input
                            className="updateComment"
                            placeholder="edit comment"
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                updateComment(ele.commentId);
                              }
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </h5>
          <h3> </h3>

          {post.length &&
            (state.signIn.userID === post[0].postedBy._id ||
              state.signIn.role === "61a4e135a6502019b9898c1e") && (
              <div className="deleteBtnContener">
                <button
                  onClick={() => {
                    deletePost(post[0]._id);
                  }}
                  className="deleteBtn"
                >
                  Delete post
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default Post;
