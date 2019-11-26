import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu fixed='left' inverted pointing vertical>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='messages'
        active={activeItem === 'messages'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='friends'
        active={activeItem === 'friends'}
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default SidebarMenu;
