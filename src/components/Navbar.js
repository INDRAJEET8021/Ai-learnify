import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary.light", height: "70px" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AI Learning Platform
        </Typography>

        {/* List Icon for Menu */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <SegmentIcon />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate("/dashboard"); }}>
            Start Learning!
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate("/progress"); }}>
            Adaptive Learning
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate("/quiz"); }}>
            Interactive Quizzes
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate("/chatbot"); }}> 
            AI Chatbot
          </MenuItem>
        </Menu>

        {/* Get Started Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "orange",
            ":hover": { backgroundColor: "darkorange" },
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          Get Started
        </Button>
      </Toolbar>
    </AppBar>
  );
}
