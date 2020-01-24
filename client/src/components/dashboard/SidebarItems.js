import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ImageSearch,
  Dashboard,
  Face,
  Info,
  MenuBook,
  ExitToApp,
  Publish
} from '@material-ui/icons';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const SidebarItems = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <ListItem
        selected={selectedIndex === 0}
        id='dashboard'
        onClick={event => handleListItemClick(event, 0)}
        button
        component={Link}
        to='/'>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>

      <ListItem
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
        button
        component={Link}
        to='/scan'>
        <ListItemIcon>
          <ImageSearch />
        </ListItemIcon>
        <ListItemText primary='New Scan' />
      </ListItem>

      <ListItem
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
        button
        component={Link}
        to='/upload'>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary='Upload & Scan' />
      </ListItem>

      <ListItem
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
        button
        component={Link}
        to='/profile'>
        <ListItemIcon>
          <Face />
        </ListItemIcon>
        <ListItemText primary='My Profile' />
      </ListItem>

      <Divider></Divider>

      <ListItem
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
        button
        component={Link}
        to='/about'>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary='About' />
      </ListItem>

      <ListItem
        selected={selectedIndex === 5}
        onClick={event => handleListItemClick(event, 5)}
        button
        component={Link}
        to='/Guide'>
        <ListItemIcon>
          <MenuBook />
        </ListItemIcon>
        <ListItemText primary='Guide' />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary='Revoke App Access' />
      </ListItem>
    </div>
  );
};

export default SidebarItems;
