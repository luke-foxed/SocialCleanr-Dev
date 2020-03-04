import axios from 'axios';
import setAuthToken from '../helpers/tokenHelper';
import { USER_LOADED, AUTH_ERROR } from '../actions/types';

export const getUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let res = await axios.get('/api/passport-auth/my-facebook');
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
