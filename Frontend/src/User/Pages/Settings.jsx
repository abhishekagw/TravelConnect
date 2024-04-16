import styled from "@emotion/styled";
import { Home } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { Link, Route, Routes ,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Editprofile from "./Editprofile";
import Changepassword from "./Changepassword";
import { useLayoutEffect } from "react";

const Settings = () => {

  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!sessionStorage.getItem("uid")) {
      navigate("/");
    }
  });

  const CustomLink = styled(Link)`
    color: inherit;
    text-decoration: none;
  `;
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />

      <Box display={"flex"}>
        <Box flex={1} borderRight=".1px solid grey" height={1000}>
          <Box position="fixed">
            <List>
              <ListItem disablePadding>
                <CustomLink to={"/settings/editprofile"}>
                  <ListItemButton
                    component="a"
                    href="#home"
                    style={{ width: "400px" }}
                  >
                    <ListItemText primary="Edit Profile" />
                  </ListItemButton>
                </CustomLink>
              </ListItem>
              <ListItem disablePadding>
                <CustomLink to={"/settings/changepassword"}>
                  <ListItemButton
                    component="a"
                    href="#home"
                    style={{ width: "400px" }}
                  >
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                </CustomLink>
              </ListItem>
              <ListItem disablePadding>
                <CustomLink to={"/user"}>
                  <ListItemButton
                    component="a"
                    href="#home"
                    style={{ width: "400px" }}
                  >
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </CustomLink>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box flex={3}>
          <Routes>
            <Route path="/" element={<Editprofile />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/changepassword" element={<Changepassword />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
