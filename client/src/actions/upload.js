import axios from 'axios';

export const beginClassification = async (modelSelection, image) => {
  let selection = { clothing: false, text: false, gestures: false, age: false };
  modelSelection.forEach(val => {
    selection[val] = true;
  });

  let response = await axios({
    method: 'post',
    url: '/api/classifier/filter_models',
    data: {
      image: image,
      models: selection
    }
  });

  return response;
};
