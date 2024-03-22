import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setSocket } from "../../../Context/UseContext";
import axios from "axios";

const Chats = () => {
  const socket = useContext(setSocket);
  console.log(socket);
  const rightPaper = { width: "100%", height: "65vh", p: "20px" };
  const chatArea = { height: "65vh", overflowY: "auto", borderBottom: "none" };
  const leftMessage = { display: "flex", justifyContent: "flex-start", mb: 2 };
  const rightMessage = { display: "flex", justifyContent: "flex-end", mb: 2 };

  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [userToId, setUserTo] = useState([]);

  const fetchUsersData = () => {
    axios.get("http://localhost:5000/followlist/" + id).then((response) => {
      setUserTo(response.data.userTo)
      console.log(userToId);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const ToId = userToId

    const Uid = sessionStorage.getItem('uid')

    socket.emit('toServer-sendMessage', { message, id, Uid, ToId }, (response) => {
      console.log(response);
      setMessage('')
      // setChatData(prevState => [...prevState, response]);
      // setShouldScroll(true); // Trigger scrolling after updating chatData
      // socket.emit("myFriendsFromClient")

    })
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  useEffect(() => {
    if (!socket) return;

  }, [socket]);

  return (
    <div>
      <Box sx={{ justifyContent: "center" }}>
        <Box>
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
          <Divider />
        </Box>
        <Box sx={rightPaper}>
          <Box sx={chatArea}>
            <Box sx={leftMessage}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
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
          </Box>
          <Divider />
          <Box sx={{ height: "auto", mr: 1.5 }}>
            <Grid item xs={11}>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                placeholder="Send a message"
                onChange={(e) => setMessage(e.target.value)}
                sx={{ borderRadius: 10, margin: 1 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleSendMessage}
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
    </div>
  );
};

export default Chats;
