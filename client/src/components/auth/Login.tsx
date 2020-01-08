import { useState, useEffect } from 'react';
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
  Collapse,
  FormGroup
} from '@material-ui/core';
import React = require('react');
import { type } from 'os';

interface UserData {
  email: '';
  password: '';
  authcode: '';
}

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
  const classes = useStyles({});
  // const [website, setWebsite] = useState<string>('');
  // const [checkbox, setCheckbox] = useState<boolean>(false);
  // const [userData, setUserData] = useState<UserData | null>();

  const [website, setWebsite] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    authcode: ''
  });

  const toggleWebsite = e => {
    setWebsite(e.currentTarget.id);
  };

  const toggleCheckbox = e => {
    setCheckbox(!checkbox);
  };

  const submit = () => {
    if (website === '') {
      return 'Please Select A Website';
    } else {
      axios({
        method: 'post',
        url: '/api/scrape/login',
        data: {
          email: userData.email,
          password: userData.password,
          authcode: userData.authcode
        }
      });
    }
  };

  const passportAuthentication = async () => {
    if (website === '') {
      console.log('Please select a website');
    } else {
      window.open(
        `http://localhost:5000/api/passport-auth/login-${website}`,
        '_self'
      );
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
                website === 'facebook'
                  ? { backgroundColor: colors.colorLightPink, color: 'white' }
                  : {}
              }
              endIcon={<FacebookIcon></FacebookIcon>}>
              Facebook
            </Button>
            <Button
              onClick={toggleWebsite}
              variant='outlined'
              style={
                website === 'twitter'
                  ? { backgroundColor: colors.colorLightPink, color: 'white' }
                  : {}
              }
              id='twitter'
              endIcon={<TwitterIcon></TwitterIcon>}>
              Twitter
            </Button>
          </ButtonGroup>
        </Tooltip>

        <FormGroup className={classes.form} onSubmit={e => e.preventDefault()}>
          <TextField
            margin='normal'
            required
            fullWidth
            onInput={e =>
              setUserData({
                ...userData,
                [(e.target as HTMLTextAreaElement)
                  .name]: (e.target as HTMLTextAreaElement).value
              })
            }
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
            onInput={e =>
              setUserData({
                ...userData,
                [(e.target as HTMLTextAreaElement)
                  .name]: (e.target as HTMLTextAreaElement).value
              })
            }
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
              fullWidth
              name='authcode'
              label='Auth Code'
              id='authcode'
              onInput={e =>
                setUserData({
                  ...userData,
                  [(e.target as HTMLTextAreaElement)
                    .name]: (e.target as HTMLTextAreaElement).value
                })
              }
            />
          </Collapse>

          <Button
            type='submit'
            onClick={submit}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign In
          </Button>
        </FormGroup>

        <Divider variant='middle' />
        <Button
          color='secondary'
          variant='contained'
          onClick={passportAuthentication}
          className={classes.authenticateButton}>
          Or Authenticate Via {website !== '' ? website : '...'}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
