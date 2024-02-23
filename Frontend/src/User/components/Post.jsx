import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Comment from "../Pages/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";

const Post = ({ data }) => {
  const [check, setCheck] = useState(false);
  const uid = sessionStorage.getItem("uid");
  const post=data._id;

  const handleFav=()=>{
    
    const datas={
      postId:post,
      userId:uid,
    }
    axios.post("http://localhost:5000/like",datas).then((res)=>{
      console.log(res.data);
    })
  }
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Rockey bhai"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="20%"
        image={data.postFile}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.postCaption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorder onClick={handleFav} />
          {/* <Favorite /> */}
        </IconButton>
        <IconButton onClick={() => setCheck((prevCheck) => !prevCheck)}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      {check && <Comment  post={post}/>}
    </Card>
  );
};

export default Post;
