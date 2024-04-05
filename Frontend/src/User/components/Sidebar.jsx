import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";
import { AccountBox, Article, Groups, Home, ModeNight, Person, Settings } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Sidebar = ({mode,setMode}) => {
  const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
  return (
    <Box
      
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">

      <List >
          <ListItem disablePadding>
          <CustomLink to={"/user"}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <Home/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            </CustomLink>
          </ListItem>
          <ListItem disablePadding>
            <CustomLink to={"/user/search"}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <SearchIcon/>
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
            </CustomLink>
          </ListItem>
          <ListItem disablePadding>
          <CustomLink to={"/user/search"}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <Groups/>
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
            </CustomLink>
          </ListItem>
          <ListItem disablePadding>
          <CustomLink to={"/settings"}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <Settings/>
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            </CustomLink>
          </ListItem>
          <ListItem disablePadding>
          <CustomLink to={"/user/myprofile"}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <AccountBox/>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
            </CustomLink>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <ModeNight/>
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode==="light" ? "dark" : "light")} /> 
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
