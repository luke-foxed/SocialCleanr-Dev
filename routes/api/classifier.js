const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');

// needed to overcome teachablemachine dom requirements
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
global.fetch = require('node-fetch');
global.document = dom.window.document;

let maleClothedModel, femaleClothedModel;

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
    modelPaths.maleClothed.model,
    modelPaths.maleClothed.metadata
  );

  let converted = await getTensor3dObject(req.body.image);
  console.log(await model.predict(converted));
});

module.exports = router;
