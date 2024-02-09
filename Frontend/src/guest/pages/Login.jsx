import {
  Avatar,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";

const Login = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "60vh",
  };
  const textStyle = { paddingTop: "20px", paddingBottom: "10px" };
  return (
    <Grid>
      <Paper elevation={5} sx={paperStyle}>
        <Grid align="center">
          <Avatar></Avatar>
          <h2 style={{ margin: 5,fontFamily:"cursive",fontSize:"2rem",color:"#36454F" }}>TravelConnect</h2>
          <Typography variant="caption">Log in To Your Account</Typography>
        </Grid>
        <Grid sx={textStyle}>
          <form>
            <Grid sx={textStyle}>
              <TextField fullWidth label="Username or Email" />
            </Grid>
            <TextField fullWidth label="Password" />
            <Grid align="center" sx={textStyle}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Log in
              </Button>
            </Grid>
            <Typography sx={{ margin: "8px 0" }}>
              <Divider>OR</Divider>
              <Grid align="center" sx={{paddingTop:"8px"}}>
              <Link href="#">Forgot Password</Link>
              </Grid>
            </Typography>
            <Typography align="center" >
              Dont  Have An Account ?<Link href="#">Sign Up</Link>
            </Typography>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
