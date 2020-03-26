import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ImageSearch,
  Dashboard,
  Face,
  MenuBook,
  ExitToApp,
  Palette
} from '@material-ui/icons';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import * as colors from '../../helpers/colors';

const useStyles = makeStyles(() => ({
  listItem: {
    '&$selected, &$selected:hover, &$selected:focus': {
      backgroundColor: colors.colorPurple,
      color: 'white'
    }
  },
  selected: {}
}));

const SidebarItems = ({ onLogoutClick }) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    onLogoutClick();
  };

  return (
    <div>
      <ListItem
        classes={{ root: classes.listItem, selected: classes.selected }}
        selected={selectedIndex === 0}
        id='dashboard'
        onClick={event => handleListItemClick(event, 0)}
        button
        component={Link}
        to='/'>
        <ListItemIcon style={selectedIndex === 0 ? { color: 'white' } : {}}>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>

      <ListItem
        classes={{ root: classes.listItem, selected: classes.selected }}
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
        button
        component={Link}
        to='/scan'>
        <ListItemIcon style={selectedIndex === 1 ? { color: 'white' } : {}}>
          <ImageSearch />
        </ListItemIcon>
        <ListItemText primary='New Scan' />
      </ListItem>

      <ListItem
        classes={{ root: classes.listItem, selected: classes.selected }}
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
        button
        component={Link}
        to='/custom'>
        <ListItemIcon style={selectedIndex === 2 ? { color: 'white' } : {}}>
          <Palette />
        </ListItemIcon>
        <ListItemText primary='Custom Scan' />
      </ListItem>

      <ListItem
        classes={{ root: classes.listItem, selected: classes.selected }}
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
        button
        component={Link}
        to='/profile'>
        <ListItemIcon style={selectedIndex === 3 ? { color: 'white' } : {}}>
          <Face />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItem>

      <Divider></Divider>

      <ListItem
        classes={{ root: classes.listItem, selected: classes.selected }}
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
        button
        component={Link}
        to='/guide'>
        <ListItemIcon style={selectedIndex === 4 ? { color: 'white' } : {}}>
          <MenuBook />
        </ListItemIcon>
        <ListItemText primary='Guide' />
      </ListItem>

      <ListItem button onClick={() => handleLogout()}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
    </div>
  );
};

export default SidebarItems;
