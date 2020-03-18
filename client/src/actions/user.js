import axios from 'axios';
import { setAlert } from './alert';
import { logout } from './auth';
import { LOGIN_SUCCESS } from './types';

export const updateUser = (
  { email, current_password, password, avatar },
  updateType
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log(current_password);

  const body = JSON.stringify({
    email,
    current_password,
    password,
    avatar,
    updateType
  });

  console.log(body);

  try {
    const res = await axios.post('/api/user/update', body, config);
    console.log(res);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};
