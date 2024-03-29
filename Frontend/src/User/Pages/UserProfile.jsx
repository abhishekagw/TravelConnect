import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";

const UserProfile = () => {
  const [data, setData] = useState("");
  const [tpost, setTpost] = useState("");
  const [posts, setPOst] = useState([]);
  const [follow, setFollow] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const [message, setMessage] = useState([]);
  const uid = sessionStorage.getItem("uid");

  const { id } = useParams();

  const fetchData = () => {
    axios.get("http://localhost:5000/user/" + id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
    axios.get("http://localhost:5000/user/totalposts/" + id).then((res) => {
      console.log(res.data);
      setTpost(res.data.totalPosts);
    });

    axios
      .get("http://localhost:5000/FollowStatus/" + uid + "/" + id)
      .then((response) => {
        console.log('follow status-'+response.data.followStatus.followStatus);
        if (response.data.followStatus.followStatus == 0) {
          setFollow(1);
          setMessage(response.data.followStatus._id);
          console.log(response.data.followStatus.followStatus);
        } else if (response.data.followStatus.followStatus == 1) {
          setFollow(2);
          setMessage(response.data.followStatus._id);
          console.log(response.data.followStatus.followStatus);
        } else {
          setFollow(0);
        }
      });
  };

  const fetchPost = () => {
    axios.get("http://localhost:5000/postsSingleUser/" + id).then((res) => {
      console.log(res.data);
      setPOst(res.data);
    });
  };

  const handleFollow = () => {
    const data = {
      userFrom: uid,
      userTo: id,
    };
    axios.post("http://localhost:5000/follow", data).then((res) => {
      console.log(res.data);

      fetchData();
      countFollow();
    });
  };

  const handleFollowBack = () => {
    axios
      .put("http://localhost:5000/FollowStatus/" + message)
      .then((response) => {
        console.log(response.data);
        fetchData();
      });
  };

  const handleUnfollow = () => {
    axios
      .delete("http://localhost:5000/follow/" + uid + "/" + id)
      .then((res) => {
        console.log(res.data);

        setMessage("");

        fetchData();
        countFollow();
      });
  };

  const countFollow = () => {
    axios.get("http://localhost:5000/followcount/" + id).then((response) => {
      setFollowCount(response.data.followcount);
    });
  };

  useEffect(() => {
    fetchData();
    fetchPost();
    countFollow();
  }, []);
  return (
    <div>
      <Box padding={"60px"}>
        <Box display={"flex"}>
          <Box>
            {/* <Avatar
              sx={{ width: "150px", height: "150px" }}
              alt="Remy Sharp"
              src={"https://material-ui.com/static/images/avatar/1.jpg"}
            ></Avatar> */}
            {data.userPhoto ? (
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                src={data.userPhoto}
              ></Avatar>
            ) : (
              <Avatar
                sx={{ bgcolor: "red", width: "150px", height: "150px" }}
                aria-label="recipe"
              >
                {data.userFullName}
              </Avatar>
            )}
          </Box>
          <Box paddingLeft={"50px"}>
            <Box display={"flex"}>
              <Typography variant="h5" fontWeight={"bold"}>
                @ {data.userName}
              </Typography>
              <Button
                sx={{ marginLeft: "30px" }}
                variant="contained"
                onClick={() => {
                  if (follow === 1) {
                    handleFollowBack();
                  } else if (follow === 0) {
                    handleFollow();
                  } else if (follow === 2) {
                    handleUnfollow();
                  }
                }}
              >
                {follow === 1 ? 'Follow back' : follow === 0 ? 'Follow' : 'Following'}
              </Button>
              <Link to={"/user/chats/" + message}>
                <Button sx={{ marginLeft: "30px" }} variant="contained">
                  Message
                </Button>
              </Link>
              <SettingsIcon
                sx={{ paddingLeft: "25px", width: "50px", height: "30px" }}
              />
            </Box>
            <Box display={"flex"} paddingTop={"30px"}>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {tpost ? tpost : 0}{" "}
                </span>{" "}
                Posts
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "30px" }}>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {followCount ? followCount : 0}{" "}
                </span>
                Followers
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "30px" }}>
                <span style={{ fontWeight: "bold" }}> 151 </span>Following
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ paddingTop: "20px", fontWeight: "bold" }}
            >
              {data.userFullName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "15px", color: "grey" }}>
              Creator
            </Typography>
            <Box>
              <p>
                Traveling is the best way to see the beauty of the world. Travel
                is new sunshine. Go somewhere. Fill the adventure today. Tour
                the world in comfort
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={"10px"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
          <Box>
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{
                width: "90px",
                height: "90px",
                border: "2px solid",
                borderRadius: "50%",
              }}
            ></Avatar>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ paddingTop: "50px" }} />
      <Box>
        {posts.map((post) => (
          <Post data={post} fetchPost={fetchPost} />
        ))}
      </Box>
    </div>
  );
};

export default UserProfile;
