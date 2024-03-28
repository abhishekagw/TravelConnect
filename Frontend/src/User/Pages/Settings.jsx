import styled from "@emotion/styled";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { AccountBox, Groups, Home, ModeNight, Person } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Settings = () => {
  const CustomLink = styled(Link)`
    color: inherit;
    text-decoration: none;
  `;
  return (
    <Box display={"flex"}>
      <Box flex={1} borderRight=".1px solid grey" height={1000}>
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <CustomLink to={"/user"}>
                <ListItemButton component="a" href="#home">
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </CustomLink>
            </ListItem>
            <ListItem disablePadding>
              <CustomLink to={"/user/search"}>
                <ListItemButton component="a" href="#home">
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItemButton>
              </CustomLink>
            </ListItem>
            <ListItem disablePadding>
              <CustomLink to={"/user/search"}>
                <ListItemButton component="a" href="#home">
                  <ListItemIcon>
                    <Groups />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                </ListItemButton>
              </CustomLink>
            </ListItem>
            <ListItem disablePadding>
              <CustomLink to={"/user/settings"}>
                <ListItemButton component="a" href="#home">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </CustomLink>
            </ListItem>
            <ListItem disablePadding>
              <CustomLink to={"/user/myprofile"}>
                <ListItemButton component="a" href="#home">
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </CustomLink>
            </ListItem>
        
          </List>
        </Box>
      </Box>
      <Box flex={3}>center</Box>
    </Box>
  );
};

export default Settings;
