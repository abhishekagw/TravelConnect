import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Menu,
  MenuItem, styled } from "@mui/material";
import { Link , useNavigate} from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const {dispatch}= useContext(DarkModeContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const logOut = () => {
    sessionStorage.clear();
    navigate("../../");
  };
  const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..."/>
          <SearchOutlinedIcon className="icon"/>
        </div>
        <div className="items">
          <div className="item">
          <LanguageOutlinedIcon className="icon"/>
          English
          </div>
          <div className="item">
          <DarkModeOutlinedIcon className="icon" onClick={()=>dispatch({type:"TOGGLE"})}/>
          
          </div>
          <div className="item">
          <NotificationsNoneOutlinedIcon className="icon"/>
          <div className="counter">1</div>
          
          </div>
          <div className="item">
          <ChatBubbleOutlineOutlinedIcon className="icon"/>
          <div className="counter">2</div>
          
          </div>
          <div className="item">
          <ListOutlinedIcon className="icon"/>
          </div>
          <div className="item"  onClick={(e) => setOpen(true)}>
          <img src="http://m.gettywallpapers.com/wp-content/uploads/2023/09/Cristiano-Ronaldo-pfp.jpg" 
          alt="" className="avatar"/>
          </div>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>ADMIN</MenuItem>

        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
        </div>
      </div>
    </div>
  )
}

export default Navbar