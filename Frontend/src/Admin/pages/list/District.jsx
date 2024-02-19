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

const District = () => {
  const [districtName, setDistrictName] = useState("");
  const [districtData, setDistrictData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      distName: districtName,
    };

    axios.post("http://localhost:5000/district", data).then((response) => {
      console.log(response.data);
      fetchDistrict();
      setDistrictName('')

    });
  };

  const fetchDistrict = () => {
    axios.get("http://localhost:5000/district").then((response) => {
      console.log(response.data);
      setDistrictData(response.data);
    });
  };

  useEffect(() => {
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
            District
          </h2>
          <Typography variant="caption">Add District</Typography>
        </Grid>
        <Grid sx={textStyle}>
          <Grid sx={textStyle}>
            <TextField
              fullWidth
              label="District Name"
              onChange={(event) => setDistrictName(event.target.value)}
              value={districtName}
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
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {districtData.map((district, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{key + 1}</TableCell>
                <TableCell align="right">{district.distName}</TableCell>
                <TableCell align="right">{""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default District;
