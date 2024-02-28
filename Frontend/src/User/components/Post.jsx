import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "../Pages/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";

const Post = ({ data, fetchPost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [liked, setLiked] = useState(false);
  const [check, setCheck] = useState(false);
  const uid = sessionStorage.getItem("uid");
  const post = data._id;
  const user = data.userId._id;
  const userPhoto = data.userId.userPhoto;
  console.log(userPhoto);

  const LikeStatus = () => {
    axios
      .get("http://localhost:5000/LikeStatus/" + uid + "/" + post + "/")
      .then((res) => {
        if (res.data) {
          setLiked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    const datas = {
      postId: post,
      userId: uid,
    };
    axios.post("http://localhost:5000/like", datas).then((res) => {
      console.log(res.data);
      setLiked(true);
    });
  };

  const handleDislike = (id) => {
    axios
      .delete("http://localhost:5000/like/" + uid + "/" + post)
      .then((res) => {
        console.log(res.data);
        setLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/posts/" + id).then((res) => {
      console.log(res.data);
      fetchPost();
    });
    setAnchorEl(null);
  };
  const handleEdit = (id) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    LikeStatus();
  }, []);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          userPhoto ? (
            <Avatar src="userPhoto"></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {data.userId.userFullName.charAt(0)}
            </Avatar>
          )
        }
        action={
          uid === user ? (
            <Box>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: "ITEM_HEIGHT * 4.5",
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(post)}>Delete</MenuItem>
              </Menu>
            </Box>
          ) : null
        }
        title={data.userId.userFullName}
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
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            liked ? handleDislike() : handleLike();
          }}
        >
          {liked ? <FavoriteOutlinedIcon color="error" /> : <FavoriteBorder />}

          {/* <Favorite /> */}
        </IconButton>
        <IconButton onClick={() => setCheck((prevCheck) => !prevCheck)}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      {check && <Comment post={post} />}
    </Card>
  );
};

export default Post;
