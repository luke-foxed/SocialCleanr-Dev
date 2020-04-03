import React from 'react';
import {
  Typography,
  makeStyles,
  Grid,
  Divider,
  Button,
  Avatar,
  Paper
} from '@material-ui/core';
import {
  Twitter,
  Language,
  Facebook,
  CheckCircle,
  Cancel
} from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { IconHeader } from '../../../layout/IconHeader';
import { MiniDivider } from '../../../layout/MiniDivider';

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

export const ProfileSocialMedia = ({
  profile,
  user,
  onRemoveClick,
  onSetActiveClick
}) => {
  const classes = useStyles();

  const { is_connected_facebook, is_connected_twitter } = user;

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

          <MiniDivider color={'#4a4a4a'} />

          <div className={classes.actionButtonContainer}>
            <Button
              className={classes.actionButton}
              disabled={profile.site === 'facebook' || !is_connected_facebook}
              variant='contained'
              onClick={() => onSetActiveClick('facebook')}
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
              onClick={() => onRemoveClick('facebook')}>
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

          <MiniDivider color={'#4a4a4a'} />

          <div className={classes.actionButtonContainer}>
            <Button
              className={classes.actionButton}
              disabled={profile.site === 'twitter' || !is_connected_twitter}
              variant='contained'
              onClick={() => onSetActiveClick('twitter')}
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
              onClick={() => onRemoveClick('twitter')}>
              Remove Site Access
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
