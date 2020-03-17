import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  Avatar,
  withStyles,
  IconButton
} from '@material-ui/core';
import { Face, Mail, Today, Edit } from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeSite, getSocialMediaProfile } from '../../../../actions/profile';
import { IconHeader } from '../../../layout/IconHeader';
import { ProfileSocialMedia } from './ProfileSocialMedia';
import { MiniDivider } from '../../../layout/MiniDivider';

import MuiTableCell from '@material-ui/core/TableCell';

const BorderlessCell = withStyles({
  root: {
    border: 'none'
  }
})(MuiTableCell);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway'
    }
  },
  avatarFrame: {
    width: 210,
    height: 210,
    borderRadius: '50%',
    background:
      'linear-gradient(0deg, rgba(214,93,177,1) 0%, rgba(132,94,194,1) 100%)',
    display: ' flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    padding: '10px',
    borderRadius: '50%',
    width: 190,
    height: 190,
    backgroundColor: 'white'
  },
  name: {
    textTransform: 'uppercase',
    padding: '10px'
  },
  table: {
    width: '400px'
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
          <img className={classes.avatar} variant='circle' src={user.avatar} />
        </div>

        <Typography variant='h3' className={classes.name}>
          {user.name}
        </Typography>

        <MiniDivider color={'#4a4a4a'} />

        <Grid container direction='row' justify='center' style={{ width: 360 }}>
          <Grid item xs='auto' style={{ textAlign: 'center', display: 'flex' }}>
            <Mail style={{ marginRight: '10px' }} />
            <Typography variant='h6'>Email: </Typography>
          </Grid>

          <Grid
            item
            xs='auto'
            style={{
              textAlign: 'center',
              flex: 1
            }}>
            <Typography variant='h6'>{user.email}</Typography>
          </Grid>
        </Grid>

        <Grid container direction='row' justify='center' style={{ width: 360 }}>
          <Grid item xs='auto' style={{ textAlign: 'center', display: 'flex' }}>
            <Today style={{ marginRight: '10px' }} />
            <Typography variant='h6'>Created: </Typography>
          </Grid>

          <Grid
            item
            xs='auto'
            style={{
              textAlign: 'center',
              flex: 1
            }}>
            <Typography variant='h6'>{user.date.split('T')[0]}</Typography>
          </Grid>
        </Grid>
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
