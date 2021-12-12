import React from "react";
import { Link } from "react-router-dom";

const NotFoundUn = () => {
  return (
    <div>
      <h1 className="notFound">404 - Not Found!</h1>
      <button className="notfoundBtn">
        <Link className="notFoundLink" to="/">
          Back to log in
        </Link>
      </button>
    </div>
  );
};

export default NotFoundUn;
