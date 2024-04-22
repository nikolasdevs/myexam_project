import React from "react";
import logo from "../e-logo.svg";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="App-header mx-auto md:px-56 px-24 flex items-center">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <p className=" md:text-6xl text-6xl  font-black">
          Welcome to my Repository Page
        </p>

        <Link to="./RepoList">
          <button className="  py-4 px-24 rounded-full  mb-16">ENTER</button>
        </Link>
      </div>
    </>
  );
}
