import axios from 'axios';
import { cleanResults } from '../helpers/classificationHelper';

export const runManualScan = async (modelSelection, image) => {
  let response = await axios({
    method: 'post',
    url: 'http://localhost:8080/api/classifier/filter_models',
    data: {
      image: image,
      models: modelSelection
    }
  });

  let flaggedContent = cleanResults(response.data, image);
  return flaggedContent;
};
