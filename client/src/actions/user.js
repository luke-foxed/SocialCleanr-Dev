import axios from 'axios';

import { PROFILE_ERROR, GET_PROFILE } from '../actions/types';

export const getUser = () => async dispatch => {
  try {
    let res = await axios.get('/api/passport-auth/my-twitter');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
