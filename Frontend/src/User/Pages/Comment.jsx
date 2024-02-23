import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Comment = (post) => {
  const paperStyle = {
    height: "80vh",
    padding: "20px",
    margin: 5,
  };
  const typoStyle = {
    fontSize: "17px",
    fontWeight: "bold",
    display: "inline",
  };
  const captionStyle = { fontSize: "17px", paddingLeft: "12px" };

  const textStyle = { paddingLeft: "15px", width: "100%" };

  const [comments, setComments] = useState("");
  const [commentData, setCommentData] = useState([]);

  const uid = sessionStorage.getItem("uid");

  const handleComment = (e) => {
    e.preventDefault();
    const datas = {
      commentContent: comments,
      postId: post,
      userId: uid,
    };

    axios.post("http://localhost:5000/addcomment", datas).then((res) => {
      console.log(res.data);
    });
    fetchComment();
  };
  const fetchComment = () => {
    axios.get("http://localhost:5000/comments").then((res) => {
      console.log(res.data);
      setCommentData(res.data);
    });

  };
  useEffect(()=>{
    fetchComment();

  },[])


  return (
    <Box>
      <Paper elevation={2} sx={paperStyle}>
        <Box sx={{ height: "65vh", overflowY: "scroll", p: 2 }}>
          {commentData.map((comment) => (


            <Box>
              <Box display={"flex"}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
                <Box display={"flex"} paddingLeft={"13px"}>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <Typography sx={typoStyle}>User</Typography>
                    <span style={captionStyle}>
                     {comment.commentContent}
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"}>
                <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
                <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Add comment */}
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
          />

          <OutlinedInput
            components={"form"}
            onChange={(e) => setComments(e.target.value)}
            id="outlined-adornment-password"
            sx={textStyle}
            placeholder="Add a Comment"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  type="submit"
                  onClick={handleComment}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Comment;
