import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as colors from '../../helpers/colors';
import {
  ButtonGroup,
  Container,
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
import { IconHeader } from '../layout/IconHeader';
import { MiniDivider } from '../layout/MiniDivider';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    backgroundImage: 'url(' + require('../../assets/pattern.png') + ')',
    backgroundRepeat: 'repeat'
  },
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
  authActionMobile: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    alignItems: 'center',
    margin: '0 auto'
  },
  input: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colors.colorDarkPink,
    '&:hover': {
      background: colors.colorDarkPink
    }
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
        <div style={{ textAlign: 'center' }}>
          <img
            src={require('../../assets/logo.png')}
            width={250}
            height={250}
          />
        </div>
        <Paper
          elevation={4}
          className={classes.paper}
          style={{ backgroundColor: colors.colorPurple }}>
          <IconHeader icon={VerifiedUser} text={authAction} subheader={false} />
        </Paper>

        <Paper elevation={4} className={classes.paper}>
          <Typography style={{ color: 'rgb(180,180,180)' }}>
            Would you like to:
          </Typography>

          <MiniDivider color={'#4a4a4a'} />

          <ButtonGroup
            size='large'
            className={isMobile ? classes.authActionMobile : ''}>
            <Button
              onClick={toggleAuthAction}
              variant='outlined'
              id='login'
              style={
                authAction === 'login'
                  ? {
                      backgroundColor: colors.colorPurple,
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
                      backgroundColor: colors.colorPurple,
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
          <Collapse in={authAction === 'login'} style={{ width: '50%' }}>
            <FormGroup fullWidth onSubmit={e => e.preventDefault()}>
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
          <Collapse in={authAction === 'register'} style={{ width: '50%' }}>
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
