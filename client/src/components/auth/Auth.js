import React, { Fragment } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Facebook } from 'react-spinners-css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}));

const Auth = ({ getToken, isAuthenticated }) => {
  const classes = useStyles();
  const site = window.location.href.split('?')[1];

  useEffect(() => {
    async function fetchAuthToken() {
      await getToken(site);
    }
    fetchAuthToken();
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid justify='center' alignItems='center' className={classes.root}>
      <Facebook size={200} style={{ alignItems: 'center' }} />
      <Typography style={{ color: 'rgb(190,190,190)' }}>
        Please wait while you are authenticated...
      </Typography>
    </Grid>
  );
};

Auth.propTypes = {
  getToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getToken })(Auth);
