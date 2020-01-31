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

let results = {
  gender: '',
  topless: '',
  clothed: '',
  text: []
};

const detectAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectAllFaces(img).withAgeAndGender();
  let gender;
  if (ageGenderResults[0] !== undefined) {
    gender = ageGenderResults[0].gender;
  } else {
    gender = 'N/A';
  }
  return gender;
};

const detectClothing = async image => {
  let gender = await detectAgeGender(image);
  let canvasImage = await loadImage(image);

  if (gender === 'male') {
    let classifcation = await maleClothingModel.predict(canvasImage);
    results.gender = 'male';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  } else if (gender === 'female') {
    let classifcation = await femaleClothingModel.predict(canvasImage);
    results.gender = 'female';
    results.topless = classifcation[0].probability;
    results.clothed = classifcation[1].probability;
  } else {
    results.gender = 'N/A';
    results.topless = 'N/A';
    results.clothed = 'N/A';
  }

  return results;
};

const convertText = async image => {
  // remove 'data:image/jpeg;base64,' from string
  var base64result = image.split(',')[1];

  const request = {
    image: {
      content: base64result
    }
  };

  const [result] = await client.textDetection(request);
  const detections = result.textAnnotations;

  if (detections.length !== 0) {
    console.log('Text:');
    detections.forEach(text => results.text.push(text.description));
  } else {
    console.log('No text detected');
  }

  return results;
};

/////

const CLASSES = {
  1: {
    name: 'middle_finger',
    index: '1'
  }
};

const detectGesture = async image => {
  // temp model, needs to be retrained
  let gestureModel = await tf.loadGraphModel('file://C:/WEB_MODEL/model.json');
  // needs to be dynamic for any image size
  const can = createCanvas(1300, 731);
  const ctx = can.getContext('2d');

  const img = new Image();
  let object = null;
  img.onload = async () => {
    ctx.drawImage(img, 0, 0, 1300, 731);

    let tensor = await tf.browser.fromPixels(can);
    tensor = await tensor.expandDims(0);

    const height = tensor.shape[1];
    const width = tensor.shape[2];

    let output = await gestureModel.executeAsync({ image_tensor: tensor }, [
      'detection_boxes',
      'detection_scores',
      'detection_classes',
      'num_detections'
    ]);

    const boxes = await output[0].dataSync();
    const scores = await output[1].dataSync();

    // clean the webgl tensors
    tensor.dispose();
    tf.dispose(output);

    // why 300? is it because of the shape of that particular output node?
    const [maxScores, classes] = calculateMaxScores(scores, 300, 1);

    const prevBackend = tf.getBackend();
    // run post process in cpu
    tf.setBackend('cpu');

    const boxes2 = tf.tensor2d(boxes, [output[0].shape[1], output[0].shape[2]]);
    const indexTensor = await tf.image.nonMaxSuppressionAsync(
      boxes2,
      maxScores,
      20, // maxNumBoxes,
      0.5,
      0.5
    );

    const indexes = indexTensor.dataSync();
    indexTensor.dispose();

    // restore previous backend
    tf.setBackend(prevBackend);

    const objects = buildDetectedObjects(
      width,
      height,
      boxes,
      maxScores,
      indexes,
      classes
    );

    console.log(objects[0]);
    object = objects[0];
  };
  img.onerror = err => {
    throw err;
  };
  img.src = image;

  return object;
};

////

const calculateMaxScores = (scores, numBoxes, numClasses) => {
  const maxes = [];
  const classes = [];
  for (let i = 0; i < numBoxes; i++) {
    let max = Number.MIN_VALUE;
    let index = -1;
    for (let j = 0; j < numClasses; j++) {
      if (scores[i * numClasses + j] > max) {
        max = scores[i * numClasses + j];
        index = j;
      }
    }
    maxes[i] = max;
    classes[i] = index;
  }
  return [maxes, classes];
};

const buildDetectedObjects = (
  width,
  height,
  boxes,
  scores,
  indexes,
  classes
) => {
  const count = indexes.length;
  const objects = [];
  for (let i = 0; i < count; i++) {
    const bbox = [];
    for (let j = 0; j < 4; j++) {
      bbox[j] = boxes[indexes[i] * 4 + j];
    }
    const minY = bbox[0] * height;
    const minX = bbox[1] * width;
    const maxY = bbox[2] * height;
    const maxX = bbox[3] * width;
    bbox[0] = minX;
    bbox[1] = minY;
    bbox[2] = maxX;
    bbox[3] = maxY;
    objects.push({
      bbox: bbox,
      class: 'middle_finger',
      score: scores[indexes[i]]
    });
  }
  return objects;
};

module.exports = {
  loadModels,
  detectClothing,
  detectAgeGender,
  detectGesture,
  convertText
};
