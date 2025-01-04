import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Logout, Settings, AccountCircle } from '@mui/icons-material';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
  };

  return (
    <div className="mb-5 sticky top-0">
      <IconButton onClick={handleClick} size="large">
      <Avatar
        src="https://media.tacdn.com/media/attractions-splice-spp-674x446/12/61/b0/fd.jpg"
        alt="User"
        className="shadow-lg border-2 border-blue-500"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
          <AccountCircle sx={{ marginRight: 1 }} />
        </MenuItem>
        <MenuItem>
          <Settings sx={{ marginRight: 1 }} />
          הגדרות
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ marginRight: 1 }} />
          התנתק
        </MenuItem>
      </Menu>
    </div>
  );
}