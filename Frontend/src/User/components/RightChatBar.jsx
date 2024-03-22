import { Avatar, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from '@mui/material'
import React from 'react'

const RightChatBar = () => {
    const leftPaper = { width: "100%", height: "100%" };
  return (
    <div>
        <Paper sx={leftPaper} elevation={2}>
        <List>
          <ListItem  key="RemySharp">
            <ListItemIcon>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary="John Wick"></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <Grid item xs={12} style={{ padding: "10px" }}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Divider />
        <List>
          <ListItemButton key="RemySharp">
            <ListItemIcon>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            <ListItemText  sx={{color:"green"}} align="right">Online</ListItemText>
          </ListItemButton>
          <ListItemButton key="Alice">
            <ListItemIcon>
              <Avatar
                alt="Alice"
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemIcon>
            <ListItemText primary="Alice">Alice</ListItemText>
          </ListItemButton>
          <ListItemButton key="CindyBaker">
            <ListItemIcon>
              <Avatar
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              />
            </ListItemIcon>
            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
          </ListItemButton>
        </List>
      </Paper>
    </div>
  )
}

export default RightChatBar