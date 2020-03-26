import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as colors from '../../helpers/colors';
import {
  ButtonGroup,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  Collapse,
  FormGroup,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { register, login } from '../../actions/auth';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {
  LockOpen,
  PersonAdd,
  VerifiedUser,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    backgroundImage: 'url(' + require('../../assets/pattern.png') + ')',
    backgroundRepeat: 'repeat',
    padding: theme.spacing(10)
  },
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  authAction: {
    margin: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.colorPurple,
    width: 80,
    height: 80
  },
  input: {
    width: '300px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colors.colorPurple,
    '&:hover': {
      background: 'rgb(110,72,167)'
    }
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

const Auth = ({ setAlert, register, isAuthenticated, login }) => {
  const classes = useStyles();
  const [authAction, setAuthAction] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false
  });

  const [loginData, setLoginData] = useState({
    login_email: '',
    login_password: ''
  });

  const { login_email, login_password } = loginData;
  const { name, email, password, confirm_password } = formData;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const toggleAuthAction = e => {
    if (e.currentTarget.id === 'register') {
      setFormData({ ...formData, email: '', password: '' });
    }
    setAuthAction(e.currentTarget.id);
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const submitRegister = () => {
    if (email === '' || name === '' || password === '') {
      setAlert('Please Fill Out All Fields', 'error');
    } else if (password !== confirm_password) {
      setAlert('Passwords Do Not Match', 'error');
    } else {
      register({ name, email, password });
    }
  };

  const submitLogin = async () => {
    if (login_email === '' || login_password === '') {
      setAlert('Please Enter Your Email & Password', 'error');
    } else {
      login(login_email, login_password);
    }
  };

  return (
    <div className={classes.container}>
      <Container component='main' maxWidth='md'>
        <Paper elevation={2} className={classes.paper}>
          <CssBaseline />
          <Avatar className={classes.avatar} style={{ marginTop: '20px' }}>
            <VerifiedUser fontSize='large' />
          </Avatar>
          <Typography
            component='h1'
            variant='h3'
            style={{ textTransform: 'uppercase', fontFamily: 'Raleway' }}>
            {authAction}
          </Typography>

          <hr
            className={classes.divider}
            style={{ borderTop: '2px solid' + colors.colorPurple }}
          />

          <Typography style={{ color: 'rgb(180,180,180)' }}>
            Would you like to:{' '}
          </Typography>

          <ButtonGroup size='large' className={classes.authAction}>
            <Button
              onClick={toggleAuthAction}
              variant='outlined'
              id='login'
              style={
                authAction === 'login'
                  ? {
                      backgroundColor: colors.colorBlue,
                      color: 'white',
                      width: '250px'
                    }
                  : { width: '250px' }
              }
              endIcon={<LockOpen />}>
              Login
            </Button>
            <Button
              onClick={toggleAuthAction}
              variant='outlined'
              size='large'
              style={
                authAction === 'register'
                  ? {
                      backgroundColor: colors.colorDarkPink,
                      color: 'white',
                      width: '250px'
                    }
                  : { width: '250px' }
              }
              id='register'
              endIcon={<PersonAdd />}>
              Register
            </Button>
          </ButtonGroup>

          {/* LOGIN */}
          <Collapse in={authAction === 'login'}>
            <FormGroup onSubmit={e => e.preventDefault()}>
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={e =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value
                  })
                }
                id='login_email'
                label='Email Address'
                name='login_email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='login_password'
                label='Password'
                type='password'
                id='login_password'
                onInput={e =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value
                  })
                }
                autoComplete='current-password'
              />

              <Button
                type='submit'
                size='large'
                onClick={submitLogin}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Login
              </Button>
            </FormGroup>
          </Collapse>

          {/* REGISTER */}
          <Collapse in={authAction === 'register'}>
            <FormGroup onSubmit={e => e.preventDefault()}>
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                id='name'
                label='Name'
                name='name'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                id='email'
                label='Email Address'
                name='email'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={formData.showPassword ? 'text' : 'password'}
                id='password'
                onInput={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}>
                        {formData.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='confirm_password'
                label='Confirm Password'
                type={formData.showPassword ? 'text' : 'password'}
                id='confirm_password'
                onInput={e =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}>
                        {formData.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type='submit'
                onClick={submitRegister}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Register
              </Button>
            </FormGroup>
          </Collapse>
        </Paper>
      </Container>
    </div>
  );
};

Auth.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, login })(Auth);
