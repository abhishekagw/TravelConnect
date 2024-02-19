import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";


function App() {

  const[mode,setMode]=useState("light")

  const darkTheme=createTheme({
    palette:{
      mode:mode
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>

    <Box bgcolor={"background.default"} color={"text.primary"}>
     <Navbar/>
     <Stack direction="row" spacing={2} justifyContent="space-between">
     <Sidebar setMode={setMode} mode={mode}/>


      <Box flex={4} p={2}>
     <Routes>

              <Route path="/" element={<Feed />} />
            </Routes>
      </Box>

     <Rightbar/>
     </Stack>
     <Add/>
    </Box>
    </ThemeProvider>
  );
}

export default App;
