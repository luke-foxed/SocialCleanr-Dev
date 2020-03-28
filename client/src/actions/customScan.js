import axios from 'axios';
import { cleanResults } from '../helpers/classificationHelper';
import { setAlert } from './alert';
import { loadUser } from './auth';

/**
 * Run scan based off User input
 * @param {array} modelSelection - List of models selected
 * @param {string} image - Base64 string of uploaded image
 * @param {string} password - User password
 * @returns {array} A list of each flagged item
 */

export const runCustomScan = (modelSelection, image) => async dispatch => {
  try {
    let response = await axios({
      method: 'post',
      url: '/api/classifier/custom-scan',
      data: {
        image: image,
        models: modelSelection
      }
    });

    let parsedResults = cleanResults(response.data, image);

    // add custom scan increment
    parsedResults.count['custom_scans'] = 1;
    await axios.post('/api/user/write-statistics', parsedResults.count);

    dispatch(setAlert('Scan Complete', 'success'));
    dispatch(loadUser());

    return parsedResults.flaggedContent;
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'error'));
    return [];
  }
};
