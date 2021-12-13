import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const UseStorage = (props) => {
  const [url, setUrl] = useState(null);
  //<UseStorage imgP={profileImg} describe={describe} postedBy={state.signIn.userID}
  // handleClose={ handleClose()} />
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    console.log(props.imgP.name);
    const storageRef = porjectSto.ref(props.imgP.name);
    storageRef.put(props.imgP).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();
      setUrl(URL);
    });
    // eslint-disable-next-line
  }, []);
  const postIt = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/posts/create`,
      { img: url, describe: props.describe, postedBy: props.postedBy },
      {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      }
    );
    props.rerender()
    props.handleC()
  };

  return (
    <>
      <button
        className="PostItt"
        onClick={() => {
          postIt();
        }}
      >
        post
      </button>
      {url ? <h1> </h1> : <h4 className="loading">Loading ...</h4>}
    </>
  );
};

export default UseStorage;
