const axios = require('axios');
const jsdom = require('jsdom');
const { Image, createCanvas } = require('canvas');
const { JSDOM } = jsdom;
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-node');
const tfImage = require('@teachablemachine/image');
const modelPaths = require('../../classification/paths');
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

router.post('/male_clothed_tf_image', async (req, res) => {
  const generatedModel = await tfImage.load(
    modelUrl + 'model.json',
    modelUrl + 'metadata.json'
  );

  const mobilenetModel = await mobilenet.load({
    version: 2,
    alpha: 0.25 | 0.5 | 0.75 | 1.0
  });

  let converted = await getTensor3dObject(req.body.image);

  console.log('My Model: \n' + (await generatedModel.predict(converted)));
  console.log('Mobilenet: \n' + (await mobilenetModel.classify(converted)));

  // working solution -->
  // need to cut canvas
  let canvas = createCanvas(600, 600);
  let ctx = canvas.getContext('2d');

  let img = new Image();
  img.onload = async () => {
    await ctx.drawImage(img, 0, 0, 600, 600);
    res.send(await generatedModel.predict(canvas));
  };
  img.src = req.body.image;
});

module.exports = router;
