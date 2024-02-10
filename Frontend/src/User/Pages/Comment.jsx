import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const Comment = () => {
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

  return (
    <Box>
      <Paper elevation={2} sx={paperStyle}>
        <Box sx={{ height: "65vh", overflowY: "scroll", p: 2 }}>
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
                    Hello Thanks For Supporting me ,again and
                    againdsfdsfdsdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                  </span>
                </Box>
              </Box>
            </Box>

            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"}>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/4.jpg"
              />
              <Box display={"flex"} paddingLeft={"13px"}>
                <Box sx={{ paddingLeft: "10px" }}>
                  <Typography sx={typoStyle}>User2</Typography>
                  <span style={captionStyle}>
                    Hello Thanks For Supporting me ,again and
                    againdsfdsfdsdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                  </span>
                </Box>
              </Box>
            </Box>

            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>

          <Box>
            <Box display={"flex"} paddingTop={"30px"}>
              <Avatar
                alt="Cindy Baker"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
              <Box paddingLeft={"13px"} display={"flex"}>
                <Typography sx={typoStyle}>CommentUser</Typography>
                <Box>
                  <span style={captionStyle}>
                    wow,you are always good!
                  </span>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>5m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"} paddingTop={"30px"}>
              <Avatar
                alt="Trevor Henderson"
                src="https://mui.com/static/images/avatar/5.jpg"
              />
              <Box paddingLeft={"13px"} display={"flex"}>
                <Typography sx={typoStyle}>CommentUser2</Typography>
                <Box>
                  <span style={captionStyle}>
                    congrats for your succes man
                  </span>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>5m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"}>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <Box display={"flex"} paddingLeft={"13px"}>
                <Typography sx={typoStyle}>User</Typography>
                <Box>
                  <span style={captionStyle}>
                    Hello Thanks For Supporting me ,again and againdsfdsfdsd 
                    ggggggbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                  </span>
                </Box>
              </Box>
            </Box>

            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"}>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <Box display={"flex"} paddingLeft={"13px"}>
                <Typography sx={typoStyle}>User</Typography>
                <Box >
                  <span style={captionStyle}>
                    Hello Thanks For Supporting me ,again and againdsfdsfdsd
                  </span>
                </Box>
              </Box>
            </Box>

            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"}>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
              <Box display={"flex"} paddingLeft={"13px"}>
                <Typography sx={typoStyle}>User</Typography>
                <Box>
                  <span style={captionStyle}>
                    Hello Thanks For Supporting me ,again and againdsfdsfdsd
                  </span>
                </Box>
              </Box>
            </Box>

            <Box display={"flex"}>
              <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
              <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
          />

          <OutlinedInput
            id="outlined-adornment-password"
            sx={textStyle}
            placeholder="Add a Comment"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
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
