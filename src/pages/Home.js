import React from "react";
import logo from "../e-logo.svg";

import { Link } from "react-router-dom";
//import RepoList from "./RepoList";
//import RepoData from "./RepoData";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <div className="App-header mx-auto">
        <img src={logo} className="App-logo" alt="logo" />
        <p className=" text-8xl font-black">
        Welcome to my Repository Page
        </p>

        <Link to="./RepoList">
          <button className="  py-4 px-16 rounded-full  ">ENTER</button>
        </Link>
      </div>
    </>
  );
}

// const Home = () => {
//   return (
//     <div>
//       <Routes>
//         <Route exact path="/" element={<RepoList />} />
//         <Route path="/repo/:repoName" element={<RepoData />} />
//       </Routes>
//     </div>
//   );
// };

// export default Home;
