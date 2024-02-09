import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "auto",
  };
  const secPaper = {
    width: 300,
    height: "2vh",
    margin: "20px auto",
    padding: "30px 20px",
  };
  const textFieldStyle = { marginBottom: 1, backgroundColor: "#FAFAFA" };
  const mainTextStyle = {
    margin: 5,
    fontFamily: "cursive",
    fontSize: "2rem",
    color: "#36454F",
    paddingBottom: "10px",
  };
  const typoStyle = {
    fontFamily: "Segoe UI",
    color: "grey",
    fontSize: "16px",
    fontWeight: "bold",
    paddingTop: "10px",
  };
  const secTypoStyle = {
    fontFamily: "Segoe UI",
    fontSize: "16px",
    fontWeight: "normal",
  };
  return (
    <Grid>
      <Paper elevation={2} sx={paperStyle} variant="outlined">
        <Grid align="center" marginBottom={"50px"}>
          <Avatar />
          <h2 style={mainTextStyle}>TravelConnect</h2>
          <Typography variant="h7" style={typoStyle}>
            Sign up to see photos and videos from your friends.
          </Typography>
        </Grid>
        <Grid align="center">
          <form>
            <TextField label="Email" fullWidth sx={textFieldStyle} />
            <TextField label="Full Name" fullWidth sx={textFieldStyle} />
            <TextField label="Username" fullWidth sx={textFieldStyle} />
            <TextField label="Password" fullWidth sx={textFieldStyle} />

            <Grid sx={{ margin: 1 }}>
              <Typography variant="h7" color={"grey"}>
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </Typography>
            </Grid>
            <br />
            <Button fullWidth variant="contained" sx={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}> Sign up</span>
            </Button>
          </form>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={secPaper} variant="outlined">
        <Typography align="center" style={secTypoStyle}>
          Have An Account ?<Link href="#">Log in</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
