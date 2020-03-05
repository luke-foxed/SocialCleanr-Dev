import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import * as colors from '../../helpers/colors';
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
import { loginSocialMedia, loginScraper } from '../../actions/login';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { VpnLock, CodeSharp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginMethod: {
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
  },
  divider: {
    paddingBottom: theme.spacing(2),
    width: '40px',
    border: 0
  }
}));

const Login = ({ setAlert }) => {
  const classes = useStyles();
  const [loginMethod, setLoginMethod] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    authcode: ''
  });

  const toggleloginMethod = e => {
    setLoginMethod(e.currentTarget.id);
  };

  const toggleCheckbox = e => {
    setCheckbox(!checkbox);
  };

  const submit = () => {
    if (loginMethod === '') {
      setAlert('Please Select A loginMethod', 'error');
    } else if (userData.email === '' || userData.passpord === '') {
      setAlert('Please Enter An Email & Password ', 'error');
    } else if (checkbox && userData.authcode === '') {
      setAlert('Please Provide An Auth Code', 'error');
    } else {
      loginScraper(userData);
    }
  };

  const passportAuthentication = async () => {
    if (loginMethod === '') {
      setAlert('Please Select A loginMethod', 'error');
    } else {
      loginSocialMedia(loginMethod);
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Paper elevation={2} className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize='large' />
        </Avatar>
        <Typography component='h1' variant='h3'>
          SIGN IN
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />

        <Typography>Please select a login method: </Typography>
        <Tooltip title='Select a Login Method' arrow>
          <ButtonGroup size='large' className={classes.loginMethod}>
            <Button
              onClick={toggleloginMethod}
              variant='outlined'
              id='facebook'
              style={
                loginMethod === 'facebook'
                  ? { backgroundColor: 'rgb(66, 103, 178)', color: 'white' }
                  : {}
              }
              endIcon={<FacebookIcon />}>
              Facebook
            </Button>
            <Button
              className={classes.groupButton}
              onClick={toggleloginMethod}
              variant='outlined'
              style={
                loginMethod === 'twitter'
                  ? { backgroundColor: 'rgb(29,161,242)', color: 'white' }
                  : {}
              }
              id='twitter'
              endIcon={<TwitterIcon />}>
              Twitter
            </Button>

            <Button
              className={classes.groupButton}
              onClick={toggleloginMethod}
              variant='outlined'
              style={
                loginMethod === 'scraper'
                  ? { backgroundColor: colors.colorLightPink, color: 'white' }
                  : {}
              }
              id='scraper'
              endIcon={<VpnLock />}>
              Scraper
            </Button>
          </ButtonGroup>
        </Tooltip>

        <Collapse in={loginMethod === 'scraper'}>
          <FormGroup
            className={classes.form}
            onSubmit={e => e.preventDefault()}>
            <TextField
              margin='normal'
              required
              fullWidth
              onInput={e =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
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
                setUserData({ ...userData, [e.target.name]: e.target.value })
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
                  setUserData({ ...userData, [e.target.name]: e.target.value })
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
        </Collapse>

        <Divider variant='middle' />
        <Button
          color='secondary'
          variant='contained'
          style={
            loginMethod === 'scraper'
              ? { display: 'none' }
              : { display: 'block', width: '200px' }
          }
          onClick={passportAuthentication}
          className={classes.authenticateButton}>
          Login With {loginMethod !== '' ? loginMethod : '...'}
        </Button>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Login);
