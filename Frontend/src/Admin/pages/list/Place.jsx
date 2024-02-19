import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Place = () => {
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");

  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      placeDistName: district,
      placeName: place,
    };

    axios.post("http://localhost:5000/place", data).then((res) => {
      console.log(res.data);
      fetchPlace();
    });
  };

  const fetchPlace = () => {
    axios.get("http://localhost:5000/place").then((res) => {
      console.log(res.data);
      setPlaceData(res.data);
    });
  };

  const fetchDistrict = () => {
    axios.get("http://localhost:5000/district").then((res) => {
      console.log(res.data);
      setDistrictData(res.data);
    });
  };

  useEffect(() => {
    fetchPlace();
    fetchDistrict();
  }, []);

  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "50vh",
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
            Place
          </h2>
          <Typography variant="caption">Add Place</Typography>
        </Grid>
        <Grid sx={textStyle}>
          <Grid sx={textStyle}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                label="District"
                onChange={(event) => setDistrict(event.target.value)}
              >
                {
                  districtData.map((district, key) => (
                    <MenuItem key={key} value={district._id}>{district.distName}</MenuItem>

                  ))
                }
               
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={textStyle}>
            <TextField
              fullWidth
              label="Place Name"
              onChange={(event) => setPlace(event.target.value)}
            />
          </Grid>

          <Grid align="center" sx={textStyle}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer
        component={Paper}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Table sx={{ width: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SlNo</TableCell>
              <TableCell align="right">District</TableCell>
              <TableCell align="right">Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeData.map((places, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{key + 1}</TableCell>
                <TableCell align="right">{places.placeDistName.distName}</TableCell>
                <TableCell align="right">{places.placeName}</TableCell>
                <TableCell align="right">{""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Place;
