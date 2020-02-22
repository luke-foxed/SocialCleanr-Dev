const axios = require('axios');
const jsdom = require('jsdom');
const { Canvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');
const classification = require('../../classification/classification');
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

router.post('/filter_models', async (req, res) => {
  await classification.loadModels();
  let results = {};
  let gestureResults = (clothingResults = textResults = []);
  let selection = req.body.models;
  switch (true) {
    case selection.text && !selection.gestures && !selection.clothing:
      console.log('/n SELECTED TEXT');
      results = await classification.detectText(req.body.image);
      break;
    case selection.clothing && !selection.gestures && !selection.text:
      console.log('/n SELECTED CLOTHING');
      results = await classification.detectClothing(req.body.image);
      break;
    case selection.gestures && !selection.text && !selection.clothing:
      console.log('/n SELECTED GESTURES');
      results = await classification.detectGesture(req.body.image);
      break;

    // multiple options

    case selection.clothing && selection.gestures && !selection.text:
      console.log('/n SELECTED CLOTHING & GESTURES');
      clothingResults = await classification.detectClothing(req.body.image);
      gestureResults = await classification.detectGesture(req.body.image);
      break;
    case selection.clothing && selection.text && !selection.gestures:
      console.log('/n SELECTED CLOTHING & TEXT');
      clothingResults = await classification.detectClothing(req.body.image);
      textResults = await classification.detectText(req.body.image);
      break;
    case selection.gestures && selection.text && !selection.clothing:
      console.log('/n SELECTED GESTURES & TEXT');
      gestureResults = await classification.detectGesture(req.body.image);
      textResults = await classification.detectText(req.body.image);
      break;
    case selection.gestures && selection.text && selection.clothing:
      console.log('/n SELECTED ALL');
      gestureResults = await classification.detectGesture(req.body.image);
      clothingResults = await classification.detectClothing(req.body.image);
      textResults = await classification.detectText(req.body.image);
      break;
  }

  results.people = clothingResults.people || [];
  results.gestures = gestureResults.gestures || [];
  results.text = textResults.text || [];

  res.send(results);
});

module.exports = router;
