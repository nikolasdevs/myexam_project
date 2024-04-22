import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    language: "",
    visibility: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3004/repos/${id}`)
      .then((res) => {
        // Set the retrieved data to the state
        setInputData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]); // Add id to dependency array

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3004/repos/${id}`, inputData).then((res) => {
      alert("Data updated successfully");

      navigate("/");
    });
  };

  return (
    <div className="bg-gray-800 absolute  top-0 bottom-0 left-0 right-0 opacity-95 ">
      <div className="absolute h-auto w-2/6 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-2xl ">
        <div className=" flex flex-col items-start">
          <h2 className=" w-full text-xl font-semibold mb-4">
            Update Repository
          </h2>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4 w-full mt-5"
          >
            <div className="input-group">
              <label htmlFor="name" className=" w-1/2 flex">
                Name:
              </label>
              <input
                className="input-field"
                type="text"
                id="name"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description" className=" w-1/2 flex">
                Description:
              </label>
              <textarea
                className="input-field"
                id="description"
                value={inputData.description}
                onChange={(e) =>
                  setInputData({ ...inputData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="language" className=" w-1/2 flex">
                Language:
              </label>
              <select
                className="input-field"
                id="language"
                name="language"
                value={inputData.language}
                onChange={(e) =>
                  setInputData({ ...inputData, language: e.target.value })
                }
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="vue">VUE</option>
                <option value="react">React</option>
                <option value="tailwind">Tailwind</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="visibility" className=" w-1/2 flex">
                Visibility:
              </label>
              <select
                className="input-field"
                id="visibility"
                name="visibility"
                value={inputData.visibility}
                onChange={(e) =>
                  setInputData({ ...inputData, visibility: e.target.value })
                }
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className=" flex w-full justify-between gap-6">
              <button type="submit" className="w-full">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
