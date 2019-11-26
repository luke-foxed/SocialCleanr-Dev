import Avatar from '@material-ui/core/Avatar';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ButtonGroup, Tooltip } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  website: {
    margin: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing()
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  authenticateButton: {
    margin: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    authcode: ''
  });

  const toggleClick = e => {
    setActiveItem(e.currentTarget.id);
  };

  const passportAuthentication = async () => {
    if (activeItem === '') {
      console.log('Please select a website');
    } else {
      window.open('http://localhost:5000/api/passport-auth/login', '_self');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Sign In
        </Typography>

        <Tooltip title='Select a Website' arrow>
          <ButtonGroup size='large' className={classes.website}>
            <Button
              onClick={toggleClick}
              variant='outlined'
              id='facebook'
              style={
                activeItem === 'facebook' ? { backgroundColor: '#7fb4ff' } : {}
              }
              endIcon={<FacebookIcon></FacebookIcon>}>
              Facebook
            </Button>
            <Button
              className={classes.groupButton}
              onClick={toggleClick}
              variant='outlined'
              style={
                activeItem === 'twitter' ? { backgroundColor: '#7fb4ff' } : {}
              }
              id='twitter'
              endIcon={<TwitterIcon></TwitterIcon>}>
              Twitter
            </Button>
          </ButtonGroup>
        </Tooltip>

        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='authcode'
            label='Auth Code'
            id='password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign In
          </Button>
        </form>
        <Divider variant='middle' />
        <Button
          color='secondary'
          variant='contained'
          onClick={passportAuthentication}
          className={classes.authenticateButton}>
          Or Authenticate Via {activeItem !== '' ? activeItem : '...'}
        </Button>
      </div>
    </Container>
  );
};

export default Login;
