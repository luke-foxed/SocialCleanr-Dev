import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Dashboard } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileContent from './SocialMediaContent';
import { IconHeader } from '../../../layout/IconHeader';
import { UsageCharts } from './UsageCharts';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  infoHeader: {
    display: 'flex',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'grey',
  },
}));

const Home = ({ user, profile }) => {
  const classes = useStyles();

  const { photos, text } = profile;

  return (
    <Container component='main' maxWidth='lg' style={{ marginTop: '40px' }}>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange,
        }}>
        <IconHeader icon={Dashboard} text='Dashboard' subheader={false} />
      </Paper>

      {user !== null ? (
        <UsageCharts
          stats={user.statistics[0]}
          socialMediaStats={{
            photos: photos.length || 0,
            text: text.length || 0,
          }}
        />
      ) : (
        <CircularProgress className={classes.paper} />
      )}

      {photos.length > 0 || text.length > 0 ? (
        <ProfileContent photos={photos} text={text} />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography
            variant='h6'
            className={classes.infoHeader}
            style={{
              display: 'flex',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: 'grey',
            }}>
            To View Your Social Media Content, Set An Active Social Media Profile
            From The 'Profile' Page!
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps)(Home);
