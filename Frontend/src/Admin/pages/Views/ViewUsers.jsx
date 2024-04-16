import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Popper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [Tempresult, setTempResult] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchData = () => {
    axios.get("http://localhost:5000/user").then((response) => {
      console.log(response.data);
      //   setResult(response.data);
      setTempResult(response.data);
    });
  };

  const handleSearch = (event) => {
    handleOpen(event);
    const searchKeyword = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    setSearch(searchKeyword);
    if (searchKeyword === "") {
      setResult([]);
    } else {
      const filteredData = Tempresult.filter((item) =>
        item.userName.toLowerCase().startsWith(searchKeyword)
      );
      setResult(filteredData);
    }
  };

  const handleCancel = () => {
    setSearch("");
  };

  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box justifyContent="center" padding={"50px"}>
      <Box alignItems="stretch" width={700}>
        <Box display="flex" alignItems="center">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              placeholder="Search Here"
              sx={{ borderRadius: 5, m: "20px" }}
              aria-describedby={id}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="start"
                  >
                    <SearchIcon sx={{ p: "5px", cursor: "pointer" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <IconButton onClick={handleCancel}>
            <Typography sx={{ p: "10px", fontWeight: 700 }}>Cancel</Typography>
          </IconButton>
        </Box>

        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: ".5px", bgcolor: "#FAFAFA" }}>
            <Box margin={"10px"} ml={"25px"}>
              <List sx={{ width: "600px" }}>
                {result.map((user) => (
                  <Link
                    to={"/admin/userview/" + user._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton key="RemySharp" sx={{ m: "10px" }}>
                      <ListItemIcon>
                        {user.userPhoto ? (
                          <Avatar src="userPhoto"></Avatar>
                        ) : (
                          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            {user.userFullName.charAt(0)}
                          </Avatar>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ width: "800px" }}
                        primary={user.userFullName}
                      ></ListItemText>
                      <ListItemText
                        sx={{ width: "200px" }}
                        secondary={"@" + user.userName}
                      ></ListItemText>
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Box>
          </Box>
        </Popper>
        <List sx={{ overflowY: "auto" }}>
            {Tempresult.map((user)=>(
                <Box sx={{ p: 1 }}>
                <ListItemButton key="RemySharp">
                  <ListItemIcon>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://material-ui.com/static/images/avatar/1.jpg"
                    />
                  </ListItemIcon>
                  <ListItemText primary={user.userFullName}>{user.userFullName}</ListItemText>
                </ListItemButton>
              </Box>
            ))}
          
        </List>
      </Box>
    </Box>
  );
};

export default ViewUsers;
