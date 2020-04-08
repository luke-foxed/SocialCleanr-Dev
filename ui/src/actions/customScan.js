import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

/**
 * Run scan based off User input
 * @param {array} modelSelection - List of models selected
 * @param {string} image - Base64 string of uploaded image
 * @param {string} password - User password
 * @returns {array} A list of each flagged item
 */

export const runCustomScan = (modelSelection, image) => async (dispatch) => {
  try {
    let { data } = await axios({
      method: 'post',
      url: '/api/classifier/custom-scan',
      data: {
        image: image,
        models: modelSelection,
        type: 'image',
      },
    });


    dispatch(setAlert('Scan Complete', 'success'));
    dispatch(loadUser());

    return data;
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'error'));
    return [];
  }
};
