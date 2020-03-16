import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Grid,
  Button,
  Avatar
} from '@material-ui/core';
import { Face, Contacts } from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeSite, getSocialMediaProfile } from '../../../../actions/profile';
import { IconHeader } from '../../../layout/IconHeader';
import { ProfileSocialMedia } from './ProfileSocialMedia';
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
  avatarFrame: {
    width: 200,
    height: 200,
    borderRadius: '100px',
    background:
      'linear-gradient(0deg, rgba(214,93,177,1) 0%, rgba(132,94,194,1) 100%)',
    display: ' flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 190,
    height: 190,
    backgroundColor: 'white'
  },
  name: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase',
    padding: '10px'
  }
}));

const Profile = ({ user, removeSite, profile, getSocialMediaProfile }) => {
  const classes = useStyles();

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
        <div className={classes.avatarFrame}>
          <Avatar
            className={classes.avatar}
            variant='circle'
            src='https://i.ya-webdesign.com/images/raccoon-face-png.png'
          />
        </div>

        <Typography variant='h3' className={classes.name}>
          {user.name}
        </Typography>

        <MiniDivider color={'#4a4a4a'} />
      </Paper>

      <ProfileSocialMedia
        user={user}
        profile={profile}
        onRemoveClick={website => removeSite(website)}
        onSetActiveClick={website => getSocialMediaProfile(website)}
      />
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
