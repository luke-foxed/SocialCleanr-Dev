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

const Login = ({ setAlert }) => {
  const classes = useStyles();
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
      setAlert('Please Select A Website', 'error');
    } else {
      loginScraper(userData);
    }
  };

  const passportAuthentication = async () => {
    if (website === '') {
      setAlert('Please Select A Website', 'error');
    } else {
      loginSocialMedia(website);
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
              className={classes.groupButton}
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

Login.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Login);
