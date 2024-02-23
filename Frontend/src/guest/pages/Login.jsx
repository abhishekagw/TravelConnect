import {
  Alert,
  Avatar,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "60vh",
  };

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: user,
      password: password,
    };

    axios.post("http://localhost:5000/login", data).then((response) => {
      console.log(response.data);
      const {id, login} = response.data
      if(login === 'Admin'){
        sessionStorage.setItem('aid',id)
        navigate("../../Admin")

      }
      else if(login === 'User'){
        sessionStorage.setItem('uid',id)
        navigate("../../User")
      }
      else{
        
      }
    });

    setUser("");
    setPassword("");
  };

  const textStyle = { paddingTop: "20px", paddingBottom: "10px" };
  return (
    <Grid>
      <Paper
        elevation={5}
        sx={paperStyle}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Grid align="center">
          <Avatar></Avatar>
          <h2
            style={{
              margin: 5,
              fontFamily: "cursive",
              fontSize: "2rem",
              color: "#36454F",
            }}
          >
            TravelConnect
          </h2>
          <Typography variant="caption">Log in To Your Account</Typography>
        </Grid>
        <Grid sx={textStyle}>
          <Grid sx={textStyle}>
            <TextField
              fullWidth
              label="Username or Email"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Grid>
          <TextField
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Grid align="center" sx={textStyle}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log in
            </Button>
          </Grid>
          <Typography sx={{ margin: "8px 0" }}>
            <Divider>OR</Divider>
            <Grid align="center" sx={{ paddingTop: "8px" }}>
              <Link href="#">Forgot Password</Link>
            </Grid>
          </Typography>
          <Typography align="center">
            Dont Have An Account ? <Link href="#">Sign Up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
