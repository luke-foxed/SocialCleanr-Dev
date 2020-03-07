import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import setAuthToken from '../helpers/tokenHelper';

export const loadUser = site => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    let res = await axios({
      method: 'post',
      url: '/api/passport-auth/get-user',
      data: {
        website: site
      }
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Get token to confirm successful login
export const getToken = site => async dispatch => {
  try {
    let res = await axios.get('/api/passport-auth/get-token');

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser(site));
    console.log('loading user');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }

    dispatch({
      type: LOGIN_FAILURE
    });
  }
};
