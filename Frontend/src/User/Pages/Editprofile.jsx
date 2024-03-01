import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Editprofile = () => {
  return (
    <div>
      <Box padding={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexDirection: "column" }}>
            <Avatar
              sx={{ bgcolor: "secondary.main", width: 100, height: 100 }}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
            <p style={{ marginLeft: "0", marginBottom: "45px" }}>
              Change Profile Picture
            </p>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ m: 5 }}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Name</Typography>
            <TextField id="standard-basic" variant="standard" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Username</Typography>
            <TextField id="standard-basic" variant="standard" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Bio</Typography>
            <TextField id="standard-basic" variant="standard" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Contact</Typography>
            <TextField id="standard-basic" variant="standard" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Gender</Typography>
            <FormControl sx={{ width: "200px" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem>Male</MenuItem>
                <MenuItem>Female</MenuItem>
                <MenuItem>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} justifyContent={"center"} margin={"20px"}>
            <Button sx={{ marginLeft: "30px" }} variant="contained">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Editprofile;
