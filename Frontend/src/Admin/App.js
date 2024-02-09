import { useContext } from "react";
import Home from "./pages/home/Home";
import "./styles/dark.scss";
import "./pages/home/home.scss";
import { DarkModeContext } from "./context/darkModeContext";
import District from "./pages/list/District";
import Place from "./pages/list/Place";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/district" element={<District />} />
              <Route path="/place" element={<Place />} />
            </Routes>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default App;
