import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const Home = () => {
  let navigate = useNavigate();
  const [post, setPosts] = useState("");
  const [describe, setDescribe] = useState("initialState");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
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
    getAllPosts();
    handleClose();
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



      <li className="lie">
              <span className="link">
                <span className="newPostBtn">
                  <span className="newP"
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    New post
                  </span>
                </span>
                <Modal
                  className="modal"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <span className="NewPostModel">
                    <Box sx={style} className="box">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        <span className="newPostText">What's happening? </span>
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input
                          className="newPostInputt"
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
                  </span>
                </Modal>
              </span>
            </li>






      {!post.length ? (
        <h2> loading ... </h2>
      ) : (


        <div className="anim">
          {post.map((ele) => {
            return (
              <div className="post" key={ele._id}>
                <div className="imgContener">
                  <img className="imgg" src={ele.postedBy.img} alt="img" />{" "}
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
          <div className="marginB"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
