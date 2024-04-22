import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import OpenModal from "./OpenModal";

const RepoListComponent = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRepo();
  }, [page, filterValue]);

  const fetchRepo = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/repos`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const filtered = data.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const filterMatch =
      filterValue === "all" ||
      item.language.toLowerCase() === filterValue.toLowerCase();
    return nameMatch && filterMatch;
  });

  const openNewModal = () => {
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${id}?`
    );
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3004/repos/${id}`);
        alert("Repository deleted successfully");
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert(`Repository ${id} not found`);
        } else {
          console.error("Error deleting repository:", error);
          alert("An error occurred while deleting the repository");
        }
      }
    }
  };

  return (
    <div className=" h-full bg-gray-900 w-full pt-2 relative">
      <div className=" flex items-center mx-auto justify-between px-10">
        <div className="h-16 flex items-center justify-between px-4 py-4 w-1/2 rounded-full mt-8 bg-slate-600 ">
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-slate-600 w-full ps-4 pe-8 h-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-gray-400" />
        </div>

        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="mt-4 px-4 py-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="javascript">Javascript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="vue">Vue</option>
        </select>
      </div>

      <div className="flex flex-col mt-16">
        <h1 className="text-4xl font-bold text-gray-400">
          My GitHub Repositories
        </h1>

        <div>
          <div className="mt-6">
            <button onClick={openNewModal}>Create New Repository</button>
          </div>

          {openModal && (
            <OpenModal
              onClose={() => setOpenModal(false)}
              //  fetchUpdatedRepoList={fetchUpdatedRepoList}
            />
          )}
        </div>

        <ul className="flex flex-wrap gap-4 mt-10 px-4 justify-center w-full ">
          {filtered.map((repoItem) => (
            <li
              key={repoItem.id}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 py-6 px-10 w-80 h-auto flex flex-col items-center justify-between gap-4 rounded-lg"
            >
              <div className=" flex flex-col gap-4">
                <Link
                  to={`/repo/${repoItem.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold cursor-pointer"
                >
                  {repoItem.name}
                </Link>
                {repoItem.description}
              </div>
              <div className=" flex justify-between w-full mt-8 ">
                <Link
                  to={`/update/${repoItem.name}`}
                  className=" font-semibold text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Update
                </Link>
                <p
                  onClick={(e) => handleDelete(repoItem.id)}
                  className=" cursor-pointer text-red-400 hover:text-red-600 hover:underline font-semibold"
                >
                  Delete
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center my-16">
          <Link
            to={`/RepoList`}
            className=" text-white font-semibold hover:underline"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepoListComponent;
