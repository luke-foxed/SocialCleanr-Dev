import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Grid,
  Divider,
  Button
} from '@material-ui/core';
import {
  Twitter,
  Face,
  Language,
  Facebook,
  CheckCircle,
  Cancel
} from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeSite } from '../../../../actions/profile';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    paddingBottom: theme.spacing(2),
    width: '40px',
    border: 0
  },
  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase'
  },
  authenticatedText: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase',
    justifyContent: 'center',
    display: 'flex'
  }
}));

const Profile = ({ user, removeSite }) => {
  const classes = useStyles();
  const { is_connected_facebook, is_connected_twitter } = user;

  const handleRemoveClick = async website => {
    removeSite(website);
  };

  const ProfileAuthenticationText = ({ website }) => {
    let connected =
      website === 'facebook' ? is_connected_facebook : is_connected_twitter;
    return (
      <Typography className={classes.authenticatedText}>
        {website} is {connected ? '' : 'not '}authenticated
        {connected ? (
          <CheckCircle style={{ marginLeft: '5px', color: 'green' }} />
        ) : (
          <Cancel style={{ marginLeft: '5px', color: 'red' }} />
        )}
      </Typography>
    );
  };

  return (
    <Container component='main' maxWidth='md'>
      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Face
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Profile
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Language
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          App Access
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />

        <Grid container direction='row' justify='center'>
          <Grid item xs={5} style={{ textAlign: 'center' }}>
            <Facebook
              fontSize='large'
              style={{ color: '#3b5998', height: 120, width: 120 }}
            />
            <br />
            <ProfileAuthenticationText website={'facebook'} />
            <Button
              variant='contained'
              style={
                is_connected_facebook
                  ? {
                      backgroundColor: 'rgb(200,200,200)',
                      margin: '20px',
                      width: '220px'
                    }
                  : {
                      backgroundColor: colors.colorDarkPink,
                      margin: '20px',
                      width: '220px'
                    }
              }
              disabled={is_connected_facebook}>
              <a
                href={`http://localhost:5000/api/passport-auth/login-facebook/${user._id}`}
                target='_self'
                style={{ textDecoration: 'none', color: 'white' }}>
                Connect with Facebook
              </a>
            </Button>
            <Button
              disabled={!is_connected_facebook}
              variant='contained'
              style={
                is_connected_facebook
                  ? {
                      backgroundColor: colors.colorPurple,
                      width: '220px',
                      color: 'white'
                    }
                  : { backgroundColor: 'rgb(200,200,200)', width: '220px' }
              }
              onClick={() => handleRemoveClick('facebook')}>
              Remove Site Access
            </Button>
          </Grid>
          <Grid item>
            <Divider orientation='vertical' style={{ marginTop: '20px' }} />
          </Grid>
          <Grid item xs={5} style={{ textAlign: 'center' }}>
            <Twitter
              fontSize='large'
              style={{ color: '#1DA1F2', height: 120, width: 120 }}
            />
            <br />
            <ProfileAuthenticationText website={'twitter'} />
            <Button
              variant='contained'
              style={
                is_connected_twitter
                  ? {
                      backgroundColor: 'rgb(200,200,200)',
                      margin: '20px',
                      width: '220px'
                    }
                  : {
                      backgroundColor: colors.colorDarkPink,
                      margin: '20px',
                      width: '220px'
                    }
              }
              disabled={is_connected_twitter}>
              <a
                href={`http://localhost:5000/api/passport-auth/login-twitter/${user._id}`}
                target='_self'
                style={{ textDecoration: 'none', color: 'white' }}>
                Connect with Twitter
              </a>
            </Button>
            <Button
              disabled={!is_connected_twitter}
              variant='contained'
              style={
                is_connected_twitter
                  ? {
                      backgroundColor: colors.colorPurple,
                      width: '220px',
                      color: 'white'
                    }
                  : { backgroundColor: 'rgb(200,200,200)', width: '220px' }
              }
              onClick={() => handleRemoveClick('twitter')}>
              Remove Site Access
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  removeSite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { removeSite })(Profile);
