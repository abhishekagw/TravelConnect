import { Route, Routes } from "react-router-dom";
import Admin from './Admin/App'
import User from './User/App'
import Guest from './guest/App'
import Report from "./User/Pages/Report";
import Feedback from "./User/Pages/Feedback";
import Chat from "./User/Pages/Chat";
import FollowList from "./User/Pages/FollowList";
import Settings from "./User/Pages/Settings";
import { Toaster } from "react-hot-toast";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Admin/*" element={<Admin/>}/>
        <Route path="/User/*" element={<User/>}/>
        <Route path="/settings*" element={<Settings/>}/>
        <Route path="/*" element={<Guest/>}/>
        <Route path="/report" element={<Report />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/followers" element={<FollowList />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
