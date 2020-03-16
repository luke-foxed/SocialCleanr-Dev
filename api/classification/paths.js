// this is V2
const maleModel = {
  metadata:
    'https://teachablemachine.withgoogle.com/models/FuMEdqN6/metadata.json',
  model: 'https://teachablemachine.withgoogle.com/models/FuMEdqN6/model.json'
};

const maleModelV1 = {
  metadata:
    'https://teachablemachine.withgoogle.com/models/_LEWFdms/metadata.json',
  model: 'https://teachablemachine.withgoogle.com/models/_LEWFdms/model.json'
};

const maleModelLocal = {
  metadata: 'file://classification/clothing/male/metadata.json',
  model: 'file://classification/clothing/male/model.json'
};

const femaleModel = {
  metadata:
    'https://teachablemachine.withgoogle.com/models/aWzTCdCP/metadata.json',
  model: 'https://teachablemachine.withgoogle.com/models/aWzTCdCP/model.json'
};

module.exports = {
  maleModel,
  maleModelLocal,
  femaleModel
};
