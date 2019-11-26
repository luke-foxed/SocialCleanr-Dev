import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import * as colors from '../colors';
import axios from 'axios';
import {
  ButtonGroup,
  Tooltip,
  Container,
  CssBaseline,
  Avatar,
  Checkbox,
  Divider,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Paper,
  Grow,
  Collapse
} from '@material-ui/core';
import { border } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  website: {
    margin: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.colorPurple,
    width: 80,
    height: 80
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing()
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colors.colorPurple
  },

  authenticateButton: {
    margin: theme.spacing(2),
    backgroundColor: colors.colorLightPink
  }
}));

const Login = () => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    authcode: ''
  });

  const toggleWebsite = e => {
    setActiveItem(e.currentTarget.id);
  };

  const toggleCheckbox = e => {
    setCheckbox(!checkbox);
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
      <Paper elevation={2} className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize='large' />
        </Avatar>
        <Typography component='h1' variant='h3'>
          Sign In
        </Typography>

        <Tooltip title='Select a Website' arrow>
          <ButtonGroup size='large' className={classes.website}>
            <Button
              onClick={toggleWebsite}
              variant='outlined'
              id='facebook'
              style={
                activeItem === 'facebook'
                  ? { backgroundColor: colors.colorLightPink, color: 'white' }
                  : {}
              }
              endIcon={<FacebookIcon></FacebookIcon>}>
              Facebook
            </Button>
            <Button
              className={classes.groupButton}
              onClick={toggleWebsite}
              variant='outlined'
              style={
                activeItem === 'twitter'
                  ? { backgroundColor: colors.colorLightPink, color: 'white' }
                  : {}
              }
              id='twitter'
              endIcon={<TwitterIcon></TwitterIcon>}>
              Twitter
            </Button>
          </ButtonGroup>
        </Tooltip>

        <form className={classes.form} noValidate>
          <TextField
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
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            style={{ marginTop: 20 }}
            control={
              <Checkbox
                checked={checkbox}
                onChange={toggleCheckbox}
                value='checkedG'
              />
            }
            label='Does the account have 2FA?'
          />

          <Collapse in={checkbox}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='authcode'
              label='Auth Code'
              id='password'
            />
          </Collapse>

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
      </Paper>
    </Container>
  );
};

export default Login;
