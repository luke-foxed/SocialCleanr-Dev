import axios from 'axios';
import { setAlert } from './alert';
import { logout } from './auth';

export const updateUser = (
  { email, current_password, password, avatar },
  updateType
) => async dispatch => {
  const endPoint =
    updateType === 'password'
      ? '/api/user/update-password'
      : '/api/user/update-basic';

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    current_password,
    password,
    avatar,
    updateType
  });

  try {
    const res = await axios.post(endPoint, body, config);
    if (res.status === 200) {
      dispatch(setAlert(res.data.msg, 'success'));
      dispatch(logout());
    }
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }
  }
};

export const deleteUser = () => async dispatch => {
  try {
    const res = await axios.delete('/api/user/delete');
    if (res.status === 200) {
      dispatch(setAlert(res.data.msg, 'success'));
      dispatch(logout());
    }
  } catch (err) {
    console.log(err.response);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
