import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";

const FollowList = () => {
  const paperStyles = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };
  return (
    <Box>
      <Paper sx={paperStyles} elevation={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <List>
            <ListItem key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
        </Box>
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
        <List sx={{ overflowY: "auto" }}>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
              <Button sx={{width:'105px'}} sx={{width:'105px'}} variant="outlined">Following</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
              <Button sx={{width:'105px'}} variant="outlined">Following</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <Button sx={{width:'105px'}} variant="outlined">Following</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
              <Button sx={{width:'105px'}} variant="outlined">Following</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
              <Button sx={{width:'105px'}} variant="outlined">Following</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListItemButton key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              <Button sx={{width:'105px'}} variant="contained">Follow</Button>
            </ListItemButton>
          </Box>
        </List>
      </Paper>
    </Box>
  );
};

export default FollowList;
