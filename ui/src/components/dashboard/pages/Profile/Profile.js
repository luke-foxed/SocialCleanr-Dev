import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Grid,
  Divider,
  Button,
  Avatar
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
import { removeSite, getSocialMediaProfile } from '../../../../actions/profile';
import { IconHeader } from '../../../layout/IconHeader';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionButton: {
    margin: '10px',
    width: '220px',
    color: 'white'
  },
  siteAvatar: {
    background:
      'linear-gradient(0deg, rgba(214,93,177,1) 0%, rgba(132,94,194,1) 100%)',
    boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.55)',
    height: 150,
    width: 150,
    margin: '0 auto'
  }
}));

const Profile = ({ user, removeSite, profile, getSocialMediaProfile }) => {
  const classes = useStyles();
  const { is_connected_facebook, is_connected_twitter } = user;

  const handleRemoveClick = async website => {
    removeSite(website);
  };

  const handleSetActive = async site => {
    getSocialMediaProfile(site);
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
    <Container component='main' maxWidth='lg'>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange
        }}>
        <IconHeader icon={Face} text='Profile' subheader={false} />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <IconHeader icon={Language} text='App Access' subheader={true} />

        <Typography style={{ fontFamily: 'Raleway', fontSize: '18px' }}>
          Active site:{' '}
          <b
            style={{
              color: colors.colorDarkOrange,
              textTransform: 'uppercase'
            }}>
            {!profile.site ? 'not set' : profile.site}
          </b>
        </Typography>

        <Grid container direction='row' justify='center'>
          <Grid item xs style={{ textAlign: 'center' }}>
            <br />
            <Avatar className={classes.siteAvatar}>
              <Facebook fontSize='large' style={{ height: 130, width: 130 }} />
            </Avatar>
            <br />

            <ProfileAuthenticationText website={'facebook'} />

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid #4a4a4a' }}
            />

            <div className={classes.actionButtonContainer}>
              <Button
                className={classes.actionButton}
                disabled={profile.site === 'facebook' || !is_connected_facebook}
                variant='contained'
                onClick={() => handleSetActive('facebook')}
                style={
                  !is_connected_facebook || profile.site === 'facebook'
                    ? { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
                    : { backgroundColor: colors.colorDarkPink }
                }>
                Set as Active
              </Button>

              <Button
                className={classes.actionButton}
                variant='contained'
                style={
                  is_connected_facebook
                    ? { backgroundColor: '#c8c8c8' }
                    : { backgroundColor: colors.colorDarkPink }
                }
                disabled={is_connected_facebook}>
                <a
                  href={`http://localhost:5000/api/passport-auth/login-facebook/${user._id}`}
                  target='_self'
                  style={
                    is_connected_facebook
                      ? { textDecoration: 'none', color: '#8a8a8a' }
                      : { textDecoration: 'none', color: 'white' }
                  }>
                  Connect with Facebook
                </a>
              </Button>
              <Button
                className={classes.actionButton}
                disabled={!is_connected_facebook}
                variant='contained'
                style={
                  is_connected_facebook
                    ? { backgroundColor: colors.colorPurple }
                    : { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
                }
                onClick={() => handleRemoveClick('facebook')}>
                Remove Site Access
              </Button>
            </div>
          </Grid>
          <Grid item>
            <Divider orientation='vertical' style={{ marginTop: '12px' }} />
          </Grid>
          <Grid item xs style={{ textAlign: 'center' }}>
            <br />
            <Avatar className={classes.siteAvatar}>
              <Twitter fontSize='large' style={{ height: 130, width: 130 }} />
            </Avatar>
            <br />

            <ProfileAuthenticationText website={'twitter'} />

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid #4a4a4a' }}
            />
            <div className={classes.actionButtonContainer}>
              <Button
                className={classes.actionButton}
                disabled={profile.site === 'twitter' || !is_connected_twitter}
                variant='contained'
                onClick={() => handleSetActive('twitter')}
                style={
                  !is_connected_twitter || profile.site === 'twitter'
                    ? { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
                    : { backgroundColor: colors.colorDarkPink }
                }>
                Set as Active
              </Button>

              <Button
                className={classes.actionButton}
                variant='contained'
                style={
                  is_connected_twitter
                    ? { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
                    : { backgroundColor: colors.colorDarkPink }
                }
                disabled={is_connected_twitter}>
                <a
                  href={`http://localhost:5000/api/passport-auth/login-twitter/${user._id}`}
                  target='_self'
                  style={
                    is_connected_twitter
                      ? { textDecoration: 'none', color: '#8a8a8a' }
                      : { textDecoration: 'none', color: 'white' }
                  }>
                  Connect with Twitter
                </a>
              </Button>
              <Button
                className={classes.actionButton}
                disabled={!is_connected_twitter}
                variant='contained'
                style={
                  is_connected_twitter
                    ? { backgroundColor: colors.colorPurple }
                    : { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
                }
                onClick={() => handleRemoveClick('twitter')}>
                Remove Site Access
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  removeSite: PropTypes.func.isRequired,
  getSocialMediaProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps, { removeSite, getSocialMediaProfile })(
  Profile
);
