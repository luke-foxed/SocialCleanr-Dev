import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { PROFILE_ERROR, GET_PROFILE } from '../actions/types';
import {
  parseFacebookResults,
  parseTwitterResults,
} from '../helpers/profilePageHelpers';

/**
 * Remove DB values for selected site
 * @param {string} website - Name of site to remove from DB (facebook/twitter)
 */

export const removeSite = (website) => async (dispatch) => {
  try {
    await axios.post('/api/passport-auth/remove-site', { site: website });
    dispatch(setAlert('Done!', 'success'));
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(err);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};

/**
 * Connect to website, adding access token to DB and returning social media content
 * @param {string} password - User password
 * @returns {array} A list of User's photos and posts
 */

export const getSocialMediaProfile = (website) => async (dispatch) => {
  let cleanedResponse = null;
  try {
    const res = await axios.get(`/api/passport-auth/my-${website}`);

    if (website === 'facebook') {
      cleanedResponse = parseFacebookResults(res.data);
    } else {
      cleanedResponse = parseTwitterResults(res.data);
    }

    dispatch({
      type: GET_PROFILE,
      payload: cleanedResponse,
    });

    dispatch(
      setAlert(
        `${website.toUpperCase()} has been set! You can now start a scan!`,
        'success'
      )
    );
  } catch (err) {
    console.error(err);

    dispatch(
      setAlert(`Error Retrieving data from ${website.toUpperCase()}`, 'error')
    );

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
