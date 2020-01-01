const axios = require('axios');
const jsdom = require('jsdom');
const { Canvas, Image, ImageData, createCanvas, loadImage } = require('canvas');
const { JSDOM } = jsdom;
const tf = require('@tensorflow/tfjs-node');
const modelPaths = require('./paths');
const tfImage = require('@teachablemachine/image');
const request = require('request');
const cocoSSD = require('@tensorflow-models/coco-ssd');
const faceapi = require('face-api.js');
require('@tensorflow/tfjs-node');

// needed to overcome tensorflow dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// canvas parameters for drawing image
let canvas = createCanvas(500, 500);
let ctx = canvas.getContext('2d');

// define models
let maleClothingModel = '';
let femaleClothingModel = '';

const loadModels = async () => {
  personDetectionModel = await cocoSSD.load({
    base: 'mobilenet_v2'
  });

  maleClothingModel = await tfImage.load(
    modelPaths.maleClothedV2.model,
    modelPaths.maleClothedV2.metadata
  );

  femaleClothingModel = await tfImage.load(
    modelPaths.femaleClothedV2.model,
    modelPaths.femaleClothedV2.metadata
  );

  await faceapi.nets.ssdMobilenetv1.loadFromDisk('classification/faceAPI');
  await faceapi.nets.ageGenderNet.loadFromDisk('classification/faceAPI');
};

const getTensor3dObject = async imageURL => {
  let req = await axios.get(imageURL, {
    responseType: 'arraybuffer'
  });
  // 3 = jpg, 4 = png
  return tf.node.decodeJpeg(req.data, 3);
};

const detectAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectAllFaces(img).withAgeAndGender();

  console.log(ageGenderResults);
  return ageGenderResults[0].gender;
};

const detectClothing = async image => {
  let gender = await detectAgeGender(image);
  let img = await loadImage(image);
  let results = {
    gender: '',
    topless: '',
    clothed: ''
  };

  if (gender === 'male') {
    let classifcation = await maleClothingModel.predict(img);
    results.gender = 'male';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  }

  if (gender === 'female') {
    let classifcation = await femaleClothingModel.predict(img);
    results.gender = 'female';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  }

  return results;
};

module.exports = {
  loadModels,
  detectClothing,
  detectAgeGender
};
