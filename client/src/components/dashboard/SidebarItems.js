import React from 'react';
import {
  ImageSearch,
  Dashboard,
  Face,
  Info,
  MenuBook,
  ExitToApp
} from '@material-ui/icons';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

export const SidebarItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ImageSearch />
      </ListItemIcon>
      <ListItemText primary='New Scan' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Face />
      </ListItemIcon>
      <ListItemText primary='My Profile' />
    </ListItem>

    <Divider></Divider>

    <ListItem button>
      <ListItemIcon>
        <Info />
      </ListItemIcon>
      <ListItemText primary='About' />
    </ListItem>

    <ListItem button>
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
