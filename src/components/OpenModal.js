import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OpenModal({ onSubmit, onClose, fetchUpdatedRepoList }) {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    language: "",
    visibility: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3004/repos", inputData).then((res) => {
      alert("form submitted successfully");

      navigate("/");
    });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-800 absolute top-0 bottom-0 left-0 right-0 opacity-95 ">
        <div className="absolute h-auto w-2/6 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 rounded-2xl ">
          <div className=" flex flex-col items-start">
            <h2 className=" w-full text-xl font-semibold mb-4">
              Create New Repository
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
                  onChange={(e) =>
                    setInputData({ ...inputData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="visibility" className=" w-1/2 flex">
                  Language:
                </label>
                <select
                  className="input-field"
                  id="visibility"
                  name="language"
                  onChange={(e) =>
                    setInputData({ ...inputData, language: e.target.value })
                  }
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="css">Javascript</option>
                  <option value="vue">VUE</option>
                  <option value="react">React</option>
                  <option value="public">Tailwind</option>
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
                  Create
                </button>
                <button type="button" className="w-full" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
