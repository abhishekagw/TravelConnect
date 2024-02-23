import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  const [posts, setPOst] = useState([]);
  const fetchPost = () => {
    axios.get("http://localhost:5000/posts").then((res) => {
      console.log(res.data);
      setPOst(res.data);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Box>
      {posts.map((post) => (
        <Post data= {post}/>
      ))}
    </Box>
  );
};

export default Feed;
