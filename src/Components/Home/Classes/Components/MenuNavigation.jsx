import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff', // Thiết lập nền trắng cho menu
  },
  button: {
    color: '#2e89ff', // Màu chữ mặc định là trắng cho các nút
    '&.active': {
      backgroundColor: "#2e89ff", // Màu nền xanh là màu chủ đạo của theme
      color: '#ffffff', // Màu chữ trắng cho các nút được chọn
    },
  },
}));

const MenuNavigation = () => {
    const navigate= useNavigate()
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('Home'); // Nút mặc định được chọn là 'Home'

  const handleItemClick = (itemName, link) => {
    console.log(link)
    setActiveItem(itemName); 
    navigate(`/classes?type=${link}` )
  };

  return (
    <AppBar position="static" className={classes.root} style={{background: "white"}}>
      <Toolbar>
        <Button
          className={`${classes.button} ${activeItem === 'Home' ? 'active' : ''}`}
          onClick={() => handleItemClick('Home', "")}
        >
          <Typography variant="h6">Lớp của bạn</Typography>
        </Button>
        <Button
          className={`${classes.button} ${activeItem === 'About' ? 'active' : ''}`}
          onClick={() => handleItemClick('About', "pending")}
        >
          <Typography variant="h6">Lớp đang chờ</Typography>
        </Button>
        <Button
          className={`${classes.button} ${activeItem === 'Services' ? 'active' : ''}`}
          onClick={() => handleItemClick('Services', "hidden")}
        >
          <Typography variant="h6">Lớp đã ẩn</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuNavigation;
