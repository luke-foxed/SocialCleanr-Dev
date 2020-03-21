import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Container,
  Grid,
  CircularProgress
} from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Dashboard } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent';
import { IconHeader } from '../../../layout/IconHeader';
import { MiniDivider } from '../../../layout/MiniDivider';
import { VictoryPie, VictoryAxis, VictoryChart, VictoryBar } from 'victory';
import { UsageCharts } from './UsageCharts';

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
  divider: {
    width: '40px',
    border: 0
  },
  paperHeader: {
    textTransform: 'uppercase'
  }
}));

const Home = ({ user, profile }) => {
  const classes = useStyles();

  const { photos, text } = profile;

  return (
    <Container component='main' maxWidth='lg'>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange
        }}>
        <IconHeader icon={Dashboard} text='Dashboard' subheader={false} />
      </Paper>

      {user !== null ? (
        <UsageCharts stats={user.statistics[0]} />
      ) : (
        <CircularProgress className={classes.paper} />
      )}

      {photos.length > 0 || text.length > 0 ? (
        <ProfileContent photos={photos} text={text} />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography
            variant='h6'
            className={classes.paperHeader}
            style={{ display: 'flex' }}>
            To View Your Social Media Content, Select A Social Media Profile
            From The 'Profile' Page!
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Home);
