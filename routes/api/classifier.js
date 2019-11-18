const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');

const toUint8array = require('base64-to-uint8array');
const mobilenet = require('@tensorflow-models/mobilenet');

// needed to overcome teachablemachine dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;

let modelUrl = 'https://teachablemachine.withgoogle.com/models/LFYzUB9j/';

// (3 = jpg), (4 = png);
const getTensor3dObject = async inputImage => {
  let req = await axios.get(inputImage, {
    responseType: 'arraybuffer'
  });

  return tf.node.decodeJpeg(req.data, 3);
};

router.post('/male_clothed_tf', async (req, res) => {
  const newModel = await tf.loadLayersModel(modelUrl + 'model.json');

  let converted = await getTensor3dObject(req.body.image);

  newModel.predict(converted);
});

router.post('/male_clothed_tf_image', async (req, res) => {
  const model = await tfImage.load(
    modelUrl + 'model.json',
    modelUrl + 'metadata.json'
  );

  const maxPredictions = model.getTotalClasses();
  console.log(maxPredictions);

  const mobilenetModel = await mobilenet.load({
    version: 1,
    alpha: 0.25 | 0.5 | 0.75 | 1.0
  });

  let converted = await getTensor3dObject(req.body.image);

  console.log(await model.predict(converted));
  console.log(await mobilenetModel.classify(converted));
});

module.exports = router;
