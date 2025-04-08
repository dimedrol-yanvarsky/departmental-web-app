import React from "react";
import { Dropdown } from 'antd';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavDropdown = ({size, items, body}) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button sx={{ fontSize: size.vip, textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={<KeyboardArrowDownIcon/>}>
        {body}
      </Button>
    </Dropdown>
  );
};

export default NavDropdown;
