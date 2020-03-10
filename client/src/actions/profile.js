import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { CollectionsOutlined } from '@material-ui/icons';
import { PROFILE_ERROR, GET_PROFILE } from '../actions/types';
import {
  parseFacebookResults,
  parseTwitterResults
} from '../helpers/profilePageHelpers';

export const removeSite = website => async dispatch => {
  try {
    await axios.post('/api/passport-auth/remove-site', { site: website });
    dispatch(setAlert('Done!', 'success'));
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(err);
      errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};

export const getSocialMediaProfile = site => async dispatch => {
  let cleanedResponse = null;
  try {
    // disabled for debugging to avoid rate limiting
    const res = await axios.get(`/api/passport-auth/my-${site}`);

    if (site === 'facebook') {
      cleanedResponse = parseFacebookResults(res.data);
    } else {
      cleanedResponse = parseTwitterResults(res.data);
    }

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

    dispatch(
      setAlert(`Error Retrieving data from ${site.toUpperCase()}`, 'error')
    );

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
