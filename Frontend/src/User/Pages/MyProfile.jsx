import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

const MyProfile = () => {
  return (
    <div>
      <Box padding={"60px"}>
        <Box display={"flex"}>
          <Box>
            <Avatar
              sx={{ width: "150px", height: "150px" }}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
          </Box>
          <Box paddingLeft={"50px"}>
            <Box display={"flex"}>
              <Typography variant="h5" fontWeight={"bold"}>
                @agw
              </Typography>
              <Button sx={{ marginLeft: "30px" }} variant="contained">
                Edit Profile
              </Button>
              <Button sx={{ marginLeft: "30px" }} variant="contained">
                Tools
              </Button>
              <SettingsIcon
                sx={{ paddingLeft: "25px", width: "50px", height: "30px" }}
              />
            </Box>
            <Box display={"flex"} paddingTop={"30px"}>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold" }}> 223 </span> Posts
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "30px" }}>
                <span style={{ fontWeight: "bold" }}> 1050 </span>Followers
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "30px" }}>
                <span style={{ fontWeight: "bold" }}> 151 </span>Following
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ paddingTop: "20px", fontWeight: "bold" }}
            >
              Abhishek Agw
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "15px", color: "grey" }}>
              Creator
            </Typography>
            <Box>
              <p>
                Traveling is the best way to see the beauty of the world. Travel
                is new sunshine. Go somewhere. Fill the adventure today. Tour
                the world in comfort
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={"10px"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
        </Box>
      </Box>
      <Divider sx={{paddingTop:'50px'}}/>
      <Box sx={{height:'50vh'}}>

      </Box>
    </div>
  );
};

export default MyProfile;
