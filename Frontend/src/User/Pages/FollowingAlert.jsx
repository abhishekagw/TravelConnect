import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const FollowingAlert = (props) => {
    
  const data = props.datas.userFrom;
  const followStatus = props.datas.followStatus;
  const id = props.datas._id;
  const handleFollow = () => {
    axios.put("http://localhost:5000/FollowStatus/" + id).then((res) => {
      console.log(res.data);
      props.fetchData();
    });
  };
  return (
    <Card variant="outlined" sx={{ m: 1 }}>
      {console.log(data.userName)}
      <Box display={"flex "} gap={2} alignItems={"center"} p={2}>
        <Box justifyContent={"flex-start"}>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
              width: "250px",
            }}
          >
            {data.userFullName} Started Following you
          </Typography>
        </Box>
        <Box>
          {followStatus == 0 ? (
            <Button
              variant="contained"
              sx={{ height: "30px", width: "100px" }}
              onClick={handleFollow}
            >
              Follow
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ height: "30px", width: "100px" }}
              disabled
            >
              Following
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default FollowingAlert;
