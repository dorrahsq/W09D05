import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import UseStorage from "../../hocks/useStorage";
import videoo from "./../../video/video-2.mp4";
// import videooo from "./../../video/intellisense.mp4";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: 250,
};
const Input = styled("input")({
  display: "none",
});
const Home = () => {
  let navigate = useNavigate();
  const [post, setPosts] = useState("");
  const [profileImg, setProfileImg] = useState("");
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
      <video
        className="videoInsideDec"
        autoPlay={true}
        loop={true}
        muted={true}
      >
        {" "}
        <source src={videoo} type="video/mp4" />{" "}
      </video>
      <div className="bggg"></div>

      <h1 className="firstHead">Welcome to the best social media platform</h1>
      <h5 className="secHead">
        See what’s happening and what people are talking about right now!{" "}
      </h5>
      <button className="homeBtn">
        {" "}
        <a href="#gotothesecondpage"> GET STARTED </a>{" "}
      </button>

      <h2 id="gotothesecondpage"> Time line</h2>

      <li className="lie">
        <span className="link">
          <span className="newPostBtn">
            <button
              className="newP"
              onClick={() => {
                handleOpen();
              }}
            >
              New post
            </button>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <span className="newPostText">What's happening? </span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => {
                          /////////
                          setProfileImg(e.target.files[0]);
                        }}
                      />

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera className="fkoe" />
                      </IconButton>
                    </label>
                  </Stack>

                  <input
                    className="newPostInputt"
                    onChange={(e) => {
                      setDescribe(e.target.value);
                    }}
                    type="text"
                    placeholder="Write a caption"
                  />
                  <br />

                  {profileImg && (
                    <div>
                      <UseStorage
                        imgP={profileImg}
                        describe={describe}
                        postedBy={state.signIn.userID}
                        handleC={handleClose}
                        rerender={getAllPosts}
                      />
                    </div>
                  )}

                  <button
                    className="PostIt"
                    onClick={() => {
                      postIt();
                    }}
                  >
                    post
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
                {ele.img && <p className="photoPlus"> + Photo </p>}
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
