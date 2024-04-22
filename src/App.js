import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RepoList from "./pages/RepoList";
import RepoData from "./pages/RepoData";
import Update from "./pages/Update";
import ViewAll from "./components/ViewAll";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/repoList" element={<RepoList />} />
          <Route path="/repoData" element={<RepoData />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/repo/:repoName" element={<RepoData />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/view-all" element={<ViewAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
