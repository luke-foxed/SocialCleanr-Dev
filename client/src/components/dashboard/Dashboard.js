import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  CssBaseline,
  Container,
  Collapse
} from '@material-ui/core';
import { Menu, ChevronLeft, Notifications } from '@material-ui/icons';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import SidebarItems from './SidebarItems';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Upload from './pages/Upload/Upload';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUser } from '../../actions/user';
import { logout } from '../../actions/auth';
import * as colors from '../../helpers/colors';
import 'react-image-lightbox/style.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

const Dashboard = ({ auth, logout }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: colors.colorPurple }}
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {!open ? (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}>
              <Menu />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft style={{ color: 'white' }} />
            </IconButton>
          )}
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            SocialCleanr
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <HashRouter>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}>
          <div className={classes.toolbarIcon}>
            <Collapse in={open} style={{ textAlign: 'center' }} timeout={500}>
              <br />
              <img
                src='https://i.ya-webdesign.com/images/raccoon-face-png.png'
                height={100}
                width={100}
              />
              {auth.user && (
                <Typography variant='h5'>{auth.user.name}</Typography>
              )}
            </Collapse>
          </div>

          <List>
            <SidebarItems onLogoutClick={() => logout()} />
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Redirect exact from='/*' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/scan' component={Scan} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/upload' component={Upload} />
          </Container>
        </main>
      </HashRouter>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Dashboard);
