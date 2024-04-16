import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Editprofile from "./Pages/Editprofile";
import Changepassword from "./Pages/Changepassword";
import MyProfile from "./Pages/MyProfile";
import UserProfile from "./Pages/UserProfile";
import FollowingAlert from "./Pages/FollowingAlert";
import Search from "./Pages/Search";
import Chats from "./components/Chat/Chats";
import RightChatBar from "./components/RightChatBar";

function App() {
  const [mode, setMode] = useState("light");
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!sessionStorage.getItem("uid")) {
      navigate("/");
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      {sessionStorage.getItem("uid") && (
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />

            <Box flex={4} p={2}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/userprofile/:id" element={<UserProfile />} />
                <Route path="/followingalert" element={<FollowingAlert />} />
                <Route path="/search" element={<Search />} />
                <Route path="/chats/:id" element={<Chats />} />
              </Routes>
            </Box>

            <RightChatBar />
          </Stack>
          <Add />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
