import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Grid } from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Dashboard } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    width: '40px',
    border: 0
  },
  paperHeader: {
    color: 'white',
    fontFamily: 'Raleway',
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
        style={{ backgroundColor: colors.colorPurple }}>
        <Grid container direction='row' alignItems='center' justify='center'>
          <Grid item>
            <Dashboard
              fontSize='large'
              style={{
                height: 80,
                width: 80,
                color: 'white',
                paddingRight: '10px'
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant='h4'
              className={classes.paperHeader}
              style={{ display: 'inline' }}>
              Dashboard
            </Typography>
          </Grid>
        </Grid>
        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid white' }}
        />
      </Paper>
      {photos.length > 0 || text.length > 0 ? (
        <ProfileContent photos={photos} text={text} />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography
            variant='h6'
            className={classes.paperHeader}
            style={{ display: 'flex' }}>
            To View Your Social Media Content, Select A Website From The
            'Profile' Page!
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
