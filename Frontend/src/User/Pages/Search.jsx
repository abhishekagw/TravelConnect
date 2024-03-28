import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  InputBase,
  InputLabel,
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

  useEffect(() => {
    fetchData();
  }, []);

  //popper
  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Box justifyContent="center">
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
            <Typography sx={{ p: "10px", fontWeight: 700 }}>Cancel</Typography>
          </Box>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border:'.5px', bgcolor: "#FAFAFA" }}>
              <Box margin={"10px"} ml={"25px"}>
                <List sx={{ width: "600px" }}>
                  {result.map((user) => (
                    <Link
                      to={"/user/userprofile/" + user._id}
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

          <ImageList
            sx={{ width: 1100, height: 550 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </div>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];

export default Search;
