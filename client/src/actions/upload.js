import axios from 'axios';

export const beginClassification = async (modelSelection, image) => {
  let response = await axios({
    method: 'post',
    url: '/api/classifier/filter_models',
    data: {
      image: image,
      models: modelSelection
    }
  });

  return response;
};
