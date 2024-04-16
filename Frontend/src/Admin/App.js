import { useContext, useLayoutEffect } from "react";
import Home from "./pages/home/Home";
import "./styles/dark.scss";
import "./pages/home/home.scss";
import { DarkModeContext } from "./context/darkModeContext";
import District from "./pages/list/District";
import Place from "./pages/list/Place";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import UserContents from "./pages/Views/UserContents";
import ViewUsers from "./pages/Views/ViewUsers";
import ViewUserProfile from "./pages/Views/ViewUserProfile";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!sessionStorage.getItem("aid")) {
      navigate("/");
    }
  });
  return (
    <div className={darkMode ? "app dark" : "app"}>
      {sessionStorage.getItem("aid") && (
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/district" element={<District />} />
                <Route path="/place" element={<Place />} />
                <Route path="/usercontents" element={<UserContents />} />
                <Route path="/viewusers" element={<ViewUsers />} />
                <Route path="/UserView/:id" element={<ViewUserProfile />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
