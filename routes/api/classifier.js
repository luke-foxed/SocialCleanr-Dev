const axios = require('axios');
const jsdom = require('jsdom');
const { Canvas, Image, ImageData, createCanvas, loadImage } = require('canvas');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');
const classification = require('../../classification/classification');
const mobilenet = require('@tensorflow-models/mobilenet');
const cocoSSD = require('@tensorflow-models/coco-ssd');
const faceapi = require('face-api.js');
require('@tensorflow/tfjs-node');

// needed to overcome tensorflow dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData, loadImage });

// unused method, but helpful for converting images into tensor objects
const getTensor3dObject = async imageURL => {
  let req = await axios.get(imageURL, {
    responseType: 'arraybuffer'
  });
  // 3 = jpg, 4 = png
  return tf.node.decodeJpeg(req.data, 3);
};

router.post('/mobilenet', async (req, res) => {
  const mobilenetModel = await mobilenet.load({
    version: 2,
    alpha: 0.25 | 0.5 | 0.75 | 1.0
  });

  let tensor = await getTensor3dObject(req.body.image);

  console.log('MobileNet: \n');
  console.log(await mobilenetModel.classify(tensor));
});

router.post('/coco_ssd', async (req, res) => {
  const cocoSSDModel = await cocoSSD.load({
    base: 'mobilenet_v2'
  });

  let tensor = await getTensor3dObject(req.body.image);
  let prediction = await cocoSSDModel.detect(tensor);
  res.send('Number of people: ' + prediction.length);
});

router.post('/predict', async (req, res) => {
  if (req.models.clothing) {
  }
});

router.post('/predict_clothing', async (req, res) => {
  await classification.loadModels();
  let results = await classification.detectClothing(req.body.image);
  res.send(results);
});

router.post('/filter_models', async (req, res) => {
  await classification.loadModels();
  let selection = req.body.models;
  switch (true) {
    case selection.text:
      console.log('/n SELECTED TEXT');
      let results = await classification.convertText(req.body.image);
      res.send(results);
      break;
    case selection.clothing:
      console.log('/n SELECTED CLOTHING');
      // code block
      break;
    case selection.gestures:
      console.log('/n SELECTED GESTURES');
  }
});

module.exports = router;
