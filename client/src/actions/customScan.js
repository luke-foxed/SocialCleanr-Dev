import axios from 'axios';
import { cleanResults } from '../helpers/classificationHelper';
import { setAlert } from './alert';
import { loadUser } from './auth';

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

    await axios.post('/api/classifier/write-statistics', parsedResults.count);

    dispatch(setAlert('Scan Complete', 'success'));

    dispatch(loadUser());

    return parsedResults.flaggedContent;
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'error'));
    return [];
  }
};
