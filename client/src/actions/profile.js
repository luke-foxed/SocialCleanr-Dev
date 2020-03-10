import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { CollectionsOutlined } from '@material-ui/icons';
import { PROFILE_ERROR, GET_PROFILE } from '../actions/types';
import { parseFacebookResults } from '../helpers/profilePageHelpers';

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

export const getSocialMediaProfile = site => async dispatch => {
  if (site === 'facebook') {
    try {
      // disabled for debugging to avoid rate limiting
      // const res = await axios.get(`/api/passport-auth/my-${site}`);
      const cleanedResponse = parseFacebookResults('');

      // let cleanedResponse = { photos: [], text: [], site: site };

      dispatch({
        type: GET_PROFILE,
        payload: cleanedResponse
      });

      dispatch(
        setAlert(
          `${site.toUpperCase()} has been set! You can now start a scan!`,
          'success'
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } else {
    try {
      let cleanedResponse = { photos: [], text: [], site: site };

      dispatch({
        type: GET_PROFILE,
        payload: cleanedResponse
      });

      dispatch(
        setAlert(
          `${site.toUpperCase()} has been set! You can now start a scan!`,
          'success'
        )
      );
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
