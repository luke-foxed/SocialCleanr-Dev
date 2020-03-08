import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { CollectionsOutlined } from '@material-ui/icons';

export const removeSite = website => async dispatch => {
  try {
    await axios.post('/api/passport-auth/remove-site', { site: website });
    dispatch(setAlert('Done!', 'success'));
    await dispatch(loadUser());
  } catch (err) {
    CollectionsOutlined.log('ERROR');
    const errors = err.response.data.errors;

    if (errors) {
      console.log(err);
      errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};
