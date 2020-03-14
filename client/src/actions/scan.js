import { cleanResults } from '../helpers/classificationHelper';
import axios from 'axios';
import { asyncForEach } from '../helpers/generalHelpers';

export const runAutomatedScan = async (type, data) => {
  let results = [];

  if (type === 'image') {
    await asyncForEach(data, async image => {
      let response = await axios({
        method: 'post',
        url: '/api/classifier/automated-scan',
        data: {
          type: type,
          data: image
        }
      });

      let flaggedContent = cleanResults(response.data, image);
      results.push(flaggedContent);
    });

    var flattened = [].concat.apply([], results);

    return flattened;
  }
};

export const getImageAsBase64 = async image => {
  let response = await axios({
    method: 'post',
    url: '/api/classifier/get-image',
    data: {
      image: image
    }
  });

  // add header to image
  let base64 = 'data:image/jpeg;base64,' + response.data.toString();

  return base64;
};
