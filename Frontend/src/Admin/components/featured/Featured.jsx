import React, { useState } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from "axios";

const Featured = () => {
  const[activeUSerPercentage,setActiveUsers]=useState([])
  const activeUsersPercentage = () => {
    axios.get("http://localhost:5000/activeUsersPercentage").then((response) => {
      setActiveUsers(response.data.activeUsersPercentage);
    });
  };
  activeUsersPercentage();
  return (
    <div className="featured">
      Featured
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={activeUSerPercentage} text={Math.round(activeUSerPercentage)} strokeWidth={5} />
        </div>
        <p className="title">Total Sales Today</p>
        <p className="amount">420</p>
        <p className="desc"> Previous Transactions</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResullt negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">12</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResullt positive">
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
              <div className="resultAmount">12</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResullt positive">
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
              <div className="resultAmount">12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
