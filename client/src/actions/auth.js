import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from './types';
import { setAlert } from './alert';

// Get token to confirm successful login
export const getToken = () => async dispatch => {
  try {
    let res = await axios.get('/api/passport-auth/get-token');
    dispatch(setAlert('Success! Redirecting', 'success'));
    setTimeout(
      () =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        }),
      3000
    );
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
