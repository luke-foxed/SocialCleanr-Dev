const axios = require('axios');
const jsdom = require('jsdom');
const { Image, createCanvas } = require('canvas');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');
const mobilenet = require('@tensorflow-models/mobilenet');
const cocoSSD = require('@tensorflow-models/coco-ssd');
require('@tensorflow/tfjs-node');

// needed to overcome teachablemachine dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;

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

router.post('/male_clothed', async (req, res) => {
  const generatedModel = await tfImage.load(
    modelPaths.maleClothed.model,
    modelPaths.maleClothed.metadata
  );

  let canvas = createCanvas(500, 500);
  let ctx = canvas.getContext('2d');
  let img = new Image();

  img.onload = async () => {
    await ctx.drawImage(img, 0, 0, img.width, img.height);
    res.send(await generatedModel.predict(canvas));
  };
  img.src = req.body.image;
});

module.exports = router;
