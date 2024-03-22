import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "#D4D4D4",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  }));

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [Tempresult, setTempResult] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:5000/user").then((response) => {
      console.log(response.data);
      //   setResult(response.data);
      setTempResult(response.data);
    });
  };
  const handleSearch = (event) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box justifyContent="center">
        <Box
          alignItems="stretch"
          width={700}
          sx={{ backgroundColor: "#F6F8E8" }}
        >
          <Box display="flex" alignItems="center">
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                sx={{ borderRadius: 10,m:'20px' }}
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
            <Typography sx={{ p: "10px", fontWeight: 700 }}>Cancel</Typography>
          </Box>
          <Box margin={"10px"} ml={"25px"}>
            <List sx={{ width: "600px" }}>
              {result.map((user) => (
                <Link to={'/user/userprofile/'+user._id}  style={{textDecoration:'none',color:'black'}}>
                <ListItemButton key="RemySharp" sx={{ m: "10px" }} >
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
      </Box>
    </div>
  );
};

export default Search;
