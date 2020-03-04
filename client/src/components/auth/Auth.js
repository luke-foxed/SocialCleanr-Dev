import React, { Fragment } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Facebook } from 'react-spinners-css';
import { useEffect } from 'react';
import { getToken } from '../../actions/auth';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}));

const Auth = () => {
  const classes = useStyles();

  useEffect(() => {
    async function fetchAuthToken() {
      let token = await getToken();
    }

    fetchAuthToken();
  }, []);

  return (
    <Grid justify='center' alignItems='center' className={classes.root}>
      <Facebook size={200} style={{ alignItems: 'center' }} />
      <Typography style={{ color: 'rgb(190,190,190)' }}>
        Please wait while you are authenticated...
      </Typography>
    </Grid>
  );
};

export default Auth;
