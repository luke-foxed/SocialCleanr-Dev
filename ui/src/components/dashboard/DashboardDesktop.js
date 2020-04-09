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
  CssBaseline,
  Container,
  Collapse,
  Grid,
  Badge,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import { Menu, ChevronLeft, Notifications } from '@material-ui/icons';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import SidebarItems from './SidebarItems';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Guide from './pages/Guide/Guide';
import CustomScan from './pages/CustomScan/CustomScan';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import * as colors from '../../helpers/colors';
import 'react-image-lightbox/style.css';
import { MiniDivider } from '../layout/MiniDivider';

const drawerWidth = 240;

const CustomTooltip = withStyles(() => ({
  arrow: {
    colo: 'rgba(0,0,0,0.4)',
  },
  tooltip: {
    fontSize: '16px',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundImage: 'url(' + require('../../assets/pattern.png') + ')',
    backgroundRepeat: 'repeat',
    width: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    height: 80,
  },
  toolbarIcon: {
    display: 'flex',
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  centerIcon: {
    marginTop: '5px',
    borderRadius: '50%',
    zIndex: 99999,
    height: 120,
    width: 120,
    backgroundColor: 'white',
    paddingBottom: '5px',
    border: '5px solid ' + colors.colorPurple,
  },
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
          <Grid container alignItems='center'>
            <Grid container item xs={4} sm={4} justify='flex-start'>
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
                  <ChevronLeft fontSize='medium' style={{ color: 'white' }} />
                </IconButton>
              )}
            </Grid>

            <Grid
              container
              item
              xs={4}
              sm={4}
              justify='center'
              style={{ textAlign: 'center' }}>
              <div className={classes.centerIcon}>
                <img
                  src={require('../../assets/logo.png')}
                  height={105}
                  width={105}
                />
              </div>
            </Grid>

            <Grid container item xs={4} sm={4} justify='flex-end'>
              {auth.user !== null && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <img
                    src={auth.user.avatar}
                    height={70}
                    width={70}
                    style={{
                      margin: '10px',
                      borderRadius: '50%',
                      boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.3)',
                    }}
                  />

                  <CustomTooltip
                    arrow
                    title={
                      auth.user.flagged_content.length === 0
                        ? ''
                        : `You have ${auth.user.flagged_content.length} items from your last scan that have yet to be actioned`
                    }>
                    <IconButton color='inherit'>
                      <Badge
                        badgeContent={auth.user.flagged_content.length}
                        color='secondary'>
                        <Notifications fontSize={'large'} />
                      </Badge>
                    </IconButton>
                  </CustomTooltip>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <HashRouter>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}>
          <div className={classes.toolbarIcon}>
            <Collapse in={open} style={{ textAlign: 'center' }} timeout={500}>
              {auth.user !== null && (
                <div>
                  <img
                    src={require('../../assets/logo.png')}
                    height={140}
                    width={140}
                    style={{ marginTop: '10px', borderRadius: '50%' }}
                  />

                  <Typography variant='h4'>{auth.user.name}</Typography>
                  <MiniDivider color={colors.colorPurple} />
                </div>
              )}
            </Collapse>
          </div>

          <List style={{ marginTop: '20px' }}>
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
            <Route exact path='/custom' component={CustomScan} />
            <Route exact path='/guide' component={Guide} />
          </Container>
        </main>
      </HashRouter>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);
