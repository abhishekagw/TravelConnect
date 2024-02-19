import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const Chat = () => {
  const leftPaper = { width: "30%", height: "100vh" };
  const rightPaper = { width: "70%", height: "90vh" };
  const chatArea = { height: "88vh", overflowY: "auto", borderBottom: "none" };
  const leftMessage = {display: "flex",justifyContent: "flex-start",mb: 2,};
  const rightMessage = {display: "flex",justifyContent: "flex-end",mb: 2,};

  return (
    <Box sx={{ display: "flex",overflowX:"hidden" }}>
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
      <Box sx={rightPaper}>
        <Box sx={chatArea}>
          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">Hello,How are you</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  Hey, Iam Good! What about you{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={leftMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/2.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 1,
                  mr: 0,
                  backgroundColor: "primary.light",
                  borderRadius: "20px 20px 20px 5px",
                }}
              >
                <Typography variant="body1">i am also fine</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={rightMessage}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "secondary.main" }}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              ></Avatar>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  ml: 0,
                  mr: 1,
                  backgroundColor: "secondary.light",
                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                <Typography variant="body1">
                  good{" "}
                </Typography>
              </Paper>
            </Box>
          </Box>

        </Box>
        <Divider />
        <Box sx={{ height: "auto",mr:1.5 }}>
          <Grid item xs={11}>
            <OutlinedInput
              id="outlined-adornment-password"
              fullWidth
              placeholder="Send a message"
              sx={{ borderRadius: 10, margin: 1 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
