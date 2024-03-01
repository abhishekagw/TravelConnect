import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

const Changepassword = () => {
  return (
    <div>
      <Box padding={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexDirection: "column" }}>
            <Avatar
              sx={{ bgcolor: "secondary.main", width: 80, height: 80 }}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
            <Typography style={{marginTop:'10px', marginLeft: "0", marginBottom: "45px" }}>
              @USERName
            </Typography>
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
            <Typography sx={{ width: "80px" }}>Old Password</Typography>
            <TextField id="standard-basic" variant="outlined" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>New Password</Typography>
            <TextField id="standard-basic" variant="outlined" />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Confirm Password</Typography>
            <TextField id="standard-basic" variant="outlined" />
          </Box>
          <Box display={"flex"} justifyContent={"center"} margin={"20px"}>
            <Button sx={{ marginLeft: "40px" }} variant="contained">
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Changepassword