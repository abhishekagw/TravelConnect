import {
  Avatar,
  Button,
  Grid,
  Paper,
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

  const[placeData,setPlaceData]=useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data={
      placeDistName:district,
      placeName:place,

    };

    axios.post('http://localhost:5000/place',data).then((res)=>{
      console.log(res.data)
      fetchPlace();
    })
  };

  const fetchPlace=()=>{
    axios.get('http://localhost:5000/place').then((res)=>{
      console.log(res.data)
      setPlaceData(res.data);
    })
  }

  useEffect(()=>{
    fetchPlace();
  },[])

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
            <TextField
              fullWidth
              label="District Name"
              onChange={(event) => setDistrict(event.target.value)}
            />
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
      <TableContainer component={Paper} sx={{display:'flex',justifyContent:'center'}}>
        <Table sx={{width:600}} aria-label="simple table">
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
                <TableCell align="right">{places.placeDistName}</TableCell>
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
