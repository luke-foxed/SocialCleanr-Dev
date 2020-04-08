import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { asyncForEach } from '../helpers/generalHelpers';

/**
 * Run automated scan of all photos or posts
 * @param {string} type - Specify type of scan (text/image)
 * @param {array} data - List of all content (texts/images)
 * @returns {array} A list of each flagged item
 */

export const runAutomatedScan = (type, data, storeResults) => async (
  dispatch
) => {
  try {
    let results = [];

    await asyncForEach(data, async (content) => {
      let { data } = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/classifier/automated-scan',
        data: {
          type: type,
          data: content,
          store: storeResults,
        },
      });

      results.push(data);
    });

    const resultsFlattened = [].concat.apply([], results);

    // increment automated scans
    await axios.post('http://localhost:8080/api/user/write-statistics', {
      automated_scans: 1,
    });

    if (storeResults) {
      await axios.post(
        'http://localhost:8080/api/user/store-results',
        resultsFlattened
      );
    }

    dispatch(setAlert('Scan Complete', 'success'));
    dispatch(loadUser());

    return resultsFlattened;
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
    return [];
  }
};

/**
 * Retrieve image from API (to avoid CORS) and return as base64 which can be drawn on with canvas
 * @param {string} image - URL of image to be retrieved
 * @returns {string} Base64 version of image
 */

export const getImageAsBase64 = async (image) => {
  let response = await axios({
    method: 'post',
    url: 'http://localhost:8080/api/classifier/get-image',
    data: {
      image: image,
    },
  });
  // add header to image
  let base64 = 'data:image/jpeg;base64,' + response.data.toString();

  await axios.post('http://localhost:8080/api/user/write-statistics', {
    images_cleaned: 1,
  });
  return base64;
};

/**
 * Remove flagged content from database (e.g. false positive)
 * @param {string} image - URL of image to be retrieved
 */

export const removeItem = (id) => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/api/user/remove-content', {
      content_id: id,
    });
    dispatch(setAlert('Content deleted', 'success'));
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
