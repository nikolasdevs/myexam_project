import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RepoDataComponent = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const username = "nikolasdevs";

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );
        setRepo(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };

    fetchRepo();
  }, [repoName]);

  if (!repo) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-900 heights flex justify-center items-center">
      <div className=" bg-gray-300 h-auto rounded-2xl flex flex-col items-start justify-center gap-4 w-2/5 text-gray-800 p-16 ">
        <h1 className="text-2xl font-bold mb-4">Title: {repo.name}</h1>
        <p className=" text-start">Description: {repo.description}</p>
        <p>Language: {repo.language}</p>
        <p>Visibility: {repo.visibility}</p>
        <Link
          to={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className=" mt-4 w-full"
        >
          <button className="w-full bg-gray-600 text-gray-100 hover:bg-gray-900 hover:text-white rounded-full py-4 border-0">
            {" "}
            Gain Access
          </button>
        </Link>

        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default RepoDataComponent;
