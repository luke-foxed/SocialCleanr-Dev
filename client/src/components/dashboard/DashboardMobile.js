import { slide as Menu } from 'react-burger-menu';
import React, { useState } from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import SidebarItems from './SidebarItems';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Guide from './pages/Guide/Guide';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import 'react-image-lightbox/style.css';
import Custom from './pages/Custom/Custom';
import { List, makeStyles } from '@material-ui/core';
import * as colors from '../../helpers/colors';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'url(' + require('../../assets/pattern.png') + ')',
    backgroundRepeat: 'repeat'
  },

  content: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

const DashboardMobile = ({ auth, logout }) => {
  const classes = useStyles();
  const [isOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(false);

  const burgerStyle = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      transition: 'background-color 0.5s ease-in-out',
      background: colors.colorPurple
    },

    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: colors.colorPurple
    },
    bmMenuWrap: {
      width: '220px',
      top: 0,
      bottom: 0,
      left: 0
    },
    bmMenu: {
      background: 'black',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad'
    },
    bmItem: {
      paddingTop: '60px',
      outline: 'none'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };

  const handleMenu = () => {
    setMenuOpen(isOpen);
  };

  return (
    <div className={classes.root}>
      <HashRouter>
        <Menu styles={burgerStyle} isOpen={isOpen} onStateChange={handleMenu}>
          <List>
            <SidebarItems onLogoutClick={() => logout()} />
          </List>
        </Menu>

        <main className={classes.content}>
          <div className={classes.container}>
            <Redirect exact from='/*' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/scan' component={Scan} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/custom' component={Custom} />
            <Route exact path='/guide' component={Guide} />
          </div>
        </main>
      </HashRouter>
    </div>
  );
};

DashboardMobile.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(DashboardMobile);
