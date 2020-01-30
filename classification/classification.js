const axios = require('axios');
const jsdom = require('jsdom');
const {
  Canvas,
  Image,
  ImageData,
  createCanvas,
  loadImage,
  getContext
} = require('canvas');
const { JSDOM } = jsdom;
const tf = require('@tensorflow/tfjs-node');
const modelPaths = require('./paths');
const tfImage = require('@teachablemachine/image');
const request = require('request');
const cocoSSD = require('@tensorflow-models/coco-ssd');
const faceapi = require('face-api.js');
const { createWorker, createScheduler, OEM } = require('tesseract.js');
const vision = require('@google-cloud/vision');
const base64ArrayBuffer = require('base64-arraybuffer');
require('@tensorflow/tfjs-node');

// needed to overcome tensorflow dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// define models
let maleClothingModel = '';
let femaleClothingModel = '';
let gestureModel = '';
let modelsLoaded = false;

const worker = createWorker();
const client = new vision.ImageAnnotatorClient();

const loadModels = async () => {
  if (modelsLoaded) {
    console.log('\nMODELS ALREADY LOADED\n');
  } else {
    maleClothingModel = await tfImage.load(
      modelPaths.maleClothedV3.model,
      modelPaths.maleClothedV3.metadata
    );

    femaleClothingModel = await tfImage.load(
      modelPaths.femaleClothedV2.model,
      modelPaths.femaleClothedV2.metadata
    );

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('classification/faceAPI');
    await faceapi.nets.ageGenderNet.loadFromDisk('classification/faceAPI');

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    modelsLoaded = true;
    console.log('\nMODELS LOADED \n');
  }
};

const getTensor3dObject = async imageURL => {
  let req = await axios.get(imageURL, {
    responseType: 'arraybuffer'
  });
  // 3 = jpg, 4 = png
  return tf.node.decodeJpeg(req.data, 3);
};

// ----- CLASSIFICATION FUNCTIONALITY ----- //

const detectAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectAllFaces(img).withAgeAndGender();

  console.log(ageGenderResults);
  return ageGenderResults[0].gender;
};

const detectClothing = async image => {
  let gender = await detectAgeGender(image);
  let canvasImage = await loadImage(image);

  let results = {
    gender: '',
    topless: '',
    clothed: ''
  };

  if (gender === 'male') {
    let classifcation = await maleClothingModel.predict(canvasImage);
    results.gender = 'male';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  }

  if (gender === 'female') {
    let classifcation = await femaleClothingModel.predict(canvasImage);
    results.gender = 'female';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  }

  return results;
};

const convertText = async image => {
  // const { data } = await worker.detect(image);
  // console.log(data);

  const [result] = await client.textDetection(image);
  const detections = result.textAnnotations;
  console.log('Text:');
  console.log(detections);

  // return data;
};

/////

const detectGesture = async image => {
  let gestureModel = await tf.loadGraphModel('file://C:/WEB_MODEL/model.json');
  const can = createCanvas(300, 300);
  const ctx = can.getContext('2d');

  const img = new Image();
  img.onload = async () => {
    ctx.drawImage(img, 0, 0, 300, 300);

    let tensor = await tf.browser.fromPixels(can, 3);
    tensor = await tensor.expandDims(0);

    let output = await gestureModel.executeAsync({ image_tensor: tensor }, [
      'detection_boxes',
      'detection_scores',
      'detection_classes',
      'num_detections'
    ]);

    for (let i = 0; i < output.length; i++) {
      console.log(output[i].dataSync());
    }
  };
  img.onerror = err => {
    throw err;
  };
  img.src = image;
};

module.exports = {
  loadModels,
  detectClothing,
  detectAgeGender,
  detectGesture,
  convertText
};
