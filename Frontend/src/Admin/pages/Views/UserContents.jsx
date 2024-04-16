import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

const UserContents = () => {
  const [posts, setPOst] = useState([]);

  const fetchPost = () => {
    axios.get("http://localhost:5000/posts").then((res) => {
      console.log(res.data);
      setPOst(res.data);
    });
  };

   const handleDelete = (id) => {
    axios.delete("http://localhost:5000/posts/" + id).then((res) => {
      console.log(res.data);
      fetchPost();
    });
}

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Box display={"flex"}sx={{ marginTop:'10px'}}>
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {" "}
     
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {" "}
           
            <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.user.userName}
                subheader="September 14, 2016"
              />
              {post.posts[0].postType === "image" ? (<CardMedia
                component="img"
                height="194"
                image={post.posts[0].postFile}
                alt="Paella dish"
              />):(<video
                controls // Adding controls attribute for playback control
                autoplay // Adding autoplay attribute for automatic playback
                muted // Adding muted attribute to mute the video by default
                width="100%" // Setting width to 100% of the container
                height="194" // Setting height to auto to maintain aspect ratio
              >
                <source src={post.posts[0].postFile} type="video/mp4" />
              </video>)}
              
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.postCaption}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                <IconButton aria-label="add to favorites">
                 <RemoveRedEyeIcon/>
                </IconButton>
                <IconButton aria-label="share">
                  <DeleteIcon  onClick={()=>handleDelete(post._id)} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserContents;
