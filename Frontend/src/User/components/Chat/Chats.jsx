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
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { setSocket } from "../../../Context/UseContext";
import axios from "axios";

const Chats = () => {
  const { socket } = useContext(setSocket);
  const rightPaper = { width: "100%", height: "65vh", p: "20px" };
  const chatArea = { height: "65vh", overflowY: "auto", borderBottom: "none" };
  const leftMessage = { display: "flex", justifyContent: "flex-start", mb: 2 };
  const rightMessage = { display: "flex", justifyContent: "flex-end", mb: 2 };

  const { id } = useParams();
  const Uid = sessionStorage.getItem("uid");
  const [chatData, setChatData] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);

  const [message, setMessage] = useState("");
  const [userTo, setUserTo] = useState([]);
  const [shouldScroll, setShouldScroll] = useState(false); // Add state to manage scrolling
  const chatContainerRef = useRef(null);

  const fetchUsersData = () => {
    axios
      .get("http://localhost:5000/followlist/" + id + "/" + Uid)
      .then((response) => {
        setUserTo(response.data.otherUser);
      });
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started", { id });

    if (typingTimeOut) clearTimeout(typingTimeOut);

    setTypingTimeOut(
      setTimeout(() => {
        socket.emit("typing-stopped", { id });
      }, 500)
    );
  };

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false); // Reset the state after scrolling
    }
  }, [shouldScroll]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const ToId = userTo._id;

    socket.emit(
      "toServer-sendMessage",
      { message, Id: id, Uid, ToId },
      (response) => {
        console.log(response);
        setMessage("");
        setChatData((prevState) => [...prevState, response]);
        setShouldScroll(true); // Trigger scrolling after updating chatData
        // socket.emit("myFriendsFromClient")
      }
    );
  };

  const fetchChat = () => {
    axios.get(`http://localhost:5000/Chat/${id}`).then((response) => {
      setChatData(response.data.chats);
      console.log(response.data.chats);
      setShouldScroll(true); // Trigger scrolling after updating chatData
    });
  };

  useEffect(() => {
    fetchChat();
    fetchUsersData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("toServer-sendMessage", (response) => {
      setChatData((prevState) => [...prevState, response]);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("createRoomFromClient", { id });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]);

  return (
    <div>
      <Box
        sx={{ justifyContent: "center" }}
        component={"form"}
        onSubmit={handleSendMessage}
      >
        <Box>
          <List>
            <ListItem key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <Box>
                <ListItemText primary={userTo.userFullName}></ListItemText>
                {typing && (
                  <Typography variant="caption" display="block" gutterBottom>
                    typing...
                  </Typography>
                )}
              </Box>
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box sx={rightPaper}>
          <Box sx={chatArea} ref={chatContainerRef}>
            {chatData.map((chat, key) => (
              <Box sx={chat.userIdFrom === Uid ? rightMessage : leftMessage}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      chat.userIdFrom === Uid ? "row-reverse" : "row",
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
                      ml: chat.userIdFrom === Uid ? 0 : 1,
                      mr: chat.userIdFrom === Uid ? 1 : 0,
                      backgroundColor: "primary.light",
                      borderRadius:
                        chat.userIdFrom === Uid
                          ? "20px 20px 5px 20px"
                          : "20px 20px 20px 5px",
                    }}
                  >
                    <Typography variant="body1">{chat.chatContent}</Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ height: "auto", mr: 1.5 }}>
            <Grid item xs={11}>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                placeholder="Send a message"
                onChange={handleInput}
                value={message}
                sx={{ borderRadius: 10, margin: 1 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      type="submit"
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
