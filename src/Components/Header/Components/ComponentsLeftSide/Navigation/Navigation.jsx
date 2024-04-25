import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import GroupIcon from '@mui/icons-material/Group';
import NavigationComponent from './NavigationComponent';
import "./style.sass"

const Navigation = (props) => {
  const array_navigation= [{icon: <HomeIcon />, link: "", text: "Tổng quan"}, {icon: <GroupIcon />, link: "classes", text: "Lớp học"}, {icon: <LocalActivityIcon />, link: "schedule", text: "Lịch học"}]
  return (
    <div className="menu-navigation">
      {
        array_navigation?.map((item, key)=> <NavigationComponent key={key} {...item} ></NavigationComponent>)
      }
    </div>
  )
}


export default Navigation