import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const LinkToPA = ({size, avatar, isAuth}) => {
  return (
    <Tooltip title="Личный кабинет">
      <IconButton /*onClick={handleOpenUserMenu}*/ sx={{ p: 0 }}>
        { 
          isAuth === false 
          ?
            <Link style={{ color: '#000'}} to='/login'>
              <HomeIcon alt="Home" sx={{ width: size.avatar, height: size.avatar }} />
            </Link>
          :
            <Link to='/personal'>
              <Avatar alt="Avatar" src={avatar} sx={{ width: size.avatar, height: size.avatar }} />
            </Link>
        }
      </IconButton>
    </Tooltip>
  );
};

export default LinkToPA;
