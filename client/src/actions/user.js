import axios from 'axios';
import { setAlert } from './alert';
import { logout, loadUser } from './auth';

/**
 * Update User's account info
 * @param {string} email - New email to replace with old
 * @param {string} current_password - Current password, needed to verify User when changing password
 * @param {string} password - New password to replace with old
 * @param {string} avatar - URL of new avatar image
 */

export const updateUser = (
  { email, current_password, password, avatar },
  updateType
) => async (dispatch) => {
  const endPoint =
    updateType === 'password'
      ? '/api/user/update-password'
      : '/api/user/update-basic';

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    email,
    current_password,
    password,
    avatar,
    updateType,
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
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }
  }
};

/**
 * Toggle gamification system
 * @param {boolean} toggle - Enable/Disable system
 */

export const toggleGamification = (toggle) => async (dispatch) => {
  try {
    await axios.post('/api/user/game', { enabled: toggle });
    dispatch(setAlert('Done!', 'success'));
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(err);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};

/**
 * Delete User
 */

export const deleteUser = () => async (dispatch) => {
  try {
    const res = await axios.delete('/api/user/delete');
    if (res.status === 200) {
      dispatch(setAlert(res.data.msg, 'success'));
      dispatch(logout());
    }
  } catch (err) {
    console.error(err.response);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
