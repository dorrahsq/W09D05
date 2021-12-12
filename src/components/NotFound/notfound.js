import React from 'react'
import { Link } from "react-router-dom";
import "./style.css";


const Notfound = () => {
    return (
        <div>
        <h1 className="notFound">404 - Not Found!</h1>
        <button className="notfoundBtn"> <Link className="notFoundLink" to="/home">Go Home</Link></button>
      
      </div>
    )
}

export default Notfound
