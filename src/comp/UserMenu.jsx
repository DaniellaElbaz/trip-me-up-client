import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Logout, Settings, AccountCircle, History, Map, Chat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
  };

  const goToHistory = () => {
    navigate('/history');
    handleClose();
  };

  const goToMap = () => {
    navigate('/routeview_poc');
    handleClose();
  };
  const goToChat = () => {
    navigate('/');
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
        <MenuItem onClick={goToHistory}>
          <History sx={{ marginRight: 1 }} />
          history
        </MenuItem>
        <MenuItem onClick={goToMap}>
          <Map sx={{ marginRight: 1 }} />
          map
        </MenuItem>
        <MenuItem onClick={goToChat}>
          <Chat sx={{ marginRight: 1 }} />
         chat
        </MenuItem>
        <MenuItem>
          <Settings sx={{ marginRight: 1 }} />
          setting
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ marginRight: 1 }} />
          log out
        </MenuItem>
      </Menu>
    </div>
  );
}