import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container } from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Dashboard, ImageSearch } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  }
}));

const Scan = ({ user, profile }) => {
  const classes = useStyles();

  const { photos, text } = profile;

  return (
    <Container component='main' maxWidth='lg'>
      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <ImageSearch
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Scan
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        {photos.length > 0 || text.length > 0 ? (
          
          <Typography>Active Website: {profile.site}</Typography>
        ) : (
          <Typography
            variant='h6'
            className={classes.paperHeader}
            style={{ display: 'flex' }}>
            To View Your Social Media Content, Select A Website From The
            'Profile' Page!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

Scan.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Scan);
