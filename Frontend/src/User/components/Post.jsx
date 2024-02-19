import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import Comment from '../Pages/Comment'
import CommentIcon from '@mui/icons-material/Comment';

const Post = () => {
  const [check,setCheck] = useState(false)
  return (
     <Card sx={{margin:5}}>
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
      image="https://assets.traveltriangle.com/blog/wp-content/uploads/2016/07/limestone-rock-phang-nga-1-Beautiful-limestone-rock-in-the-ocean.jpg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
      </IconButton>
      <IconButton onClick={()=>setCheck(prevCheck => !prevCheck)}>

        <CommentIcon/>
      </IconButton>
      <IconButton aria-label="share">
        <Share />
      </IconButton>
      
    </CardActions>
    {
      check &&<Comment/>
    }
  </Card>
  )
}

export default Post