import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const UseStorageProfile = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = porjectSto.ref(props.imgP.name);
    storageRef.put(props.imgP).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();
      setUrl(URL);
    });
    // eslint-disable-next-line
  }, []);

  const changeProfile = () => {
    const obj = {
      _id: props.id,
      newImg: url,
    };
    // eslint-disable-next-line
    const result = axios
      .put(`${process.env.REACT_APP_BASE_URL}/posts/updateImg`, obj, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
      });

    props.reRender();
    props.handleC()
    // window.location.reload(false);
  };

  return (
    // <>
    //   {url ? changeProfile() : <h4 className="loadingProfile">Loading ...</h4>}
    // </>

    <>
    {/* <button
      className="Postt"
      onClick={() => {
        changeProfile();
      }}
    >
      post
    </button> */}
    {url ? <h1>  <button
      className="Postt"
      onClick={() => {
        changeProfile();
      }}
    >
      Update
    </button> </h1> : <h4 className="loading">Loading ...</h4>}
  </>
  );
};

export default UseStorageProfile;
