import axios from 'axios';

// sample data response
// data:
//     gender: ""
//     topless: ""
//     clothed: ""
//     gestures: Array(2)
//         0: {bbox: Array(4), class: "middle_finger", score: 0.9996972680091858}
//         1: {bbox: Array(4), class: "middle_finger", score: 0.9365322589874268}
//         length: 2
//     text: Array(0)
//         length: 0
//     image: "data:image/png;base64,iVBOR

const cleanResults = results => {
  let warnings = [];
  let fields = ['gender', 'topless', 'clothed', 'text', 'bbox', 'image'];
};

export const beginClassification = async (modelSelection, image) => {
  let response = await axios({
    method: 'post',
    url: '/api/classifier/filter_models',
    data: {
      image: image,
      models: {
        ...modelSelection
      }
    }
  });

  let cleaned = cleanResults(response.data);
  return response;
};
