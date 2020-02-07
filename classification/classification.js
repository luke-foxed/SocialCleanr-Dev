const jsdom = require('jsdom');
const { Canvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = jsdom;
const tf = require('@tensorflow/tfjs-node');
const modelPaths = require('./paths');
const tfImage = require('@teachablemachine/image');
const faceapi = require('face-api.js');
const vision = require('@google-cloud/vision');
const helpers = require('./helpers');
const cocoSSD = require('@tensorflow-models/coco-ssd');
require('@tensorflow/tfjs-node');

const fs = require('fs');

// needed to overcome tensorflow dom requirements
const dom = new JSDOM('<!DOCTYPE html>');
global.fetch = require('node-fetch');
global.document = dom.window.document;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// define models
let personDetectionModel = '';
let maleClothingModel = '';
let femaleClothingModel = '';
let gestureModel = '';
let modelsLoaded = false;

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

    gestureModel = await tf.loadGraphModel(
      'file://C:/Users/lukef/Documents/git/Social-Cleaner/classification/gestureDetection/model.json'
    );

    personDetectionModel = await cocoSSD.load();

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('classification/faceAPI');
    await faceapi.nets.ageGenderNet.loadFromDisk('classification/faceAPI');

    modelsLoaded = true;
    console.log('\nMODELS LOADED \n');
  }
};

// ----- CLASSIFICATION FUNCTIONALITY ----- //

let results = {
  people: [],
  gestures: '',
  text: [],
  image: ''
};

const detectPeople = async image => {
  let boundingBoxes = [];
  let canvasImage = await helpers.createCanvasImage(image);
  let tensor = tf.browser.fromPixels(canvasImage);
  let results = await personDetectionModel.detect(tensor);
  results.forEach(element => {
    positiveBox = element.bbox.map(box => Math.abs(Math.round(box)));
    boundingBoxes.push(positiveBox);
  });

  let images = await helpers.boundingBoxesToImage(boundingBoxes, canvasImage);

  // return array of images containing people
  return images;
};

const detectAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectAllFaces(img).withAgeAndGender();
  let detectedFaces = [];
  if (ageGenderResults[0] !== undefined) {
    Object.values(ageGenderResults).forEach(result => {
      detectedFaces.push({
        gender: result.gender,
        age: result.age
      });
    });
  }
  return detectedFaces;
};

const detectClothing = async image => {
  let people = await detectPeople(image);
  let peopleAgeGender = [];

  await helpers.asyncForEach(people, async person => {
    let detection = await detectAgeGender(person.image);
    peopleAgeGender.push({
      ...person,
      gender: detection[0].gender,
      age: detection[0].age
    });
  });

  await helpers.asyncForEach(peopleAgeGender, async person => {
    results.people = [];
    if (person.gender === 'male') {
      console.log('MALE');
      let classifcation = await maleClothingModel.predict(person);
      console.log(classifcation);

      results.people.push({
        gender: person.gender,
        topless_prediction: classifcation[0].probability,
        age: Math.round(person.age),
        bbox: person.bbox
      });
    } else if (person.gender === 'female') {
      console.log('FEMALE');
      let classifcation = await femaleClothingModel.predict(person);
      console.log(classifcation);

      results.people.push({
        gender: person.gender,
        topless_prediction: Math.round(100 * classifcation[0].probability),
        age: Math.round(person.age),
        bbox: person.bbox
      });
    }
  });

  console.log(results);

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

const detectGesture = async image => {
  let canvasImage = await helpers.createCanvasImage(image);
  let tensor = tf.browser.fromPixels(canvasImage);
  tensor = tensor.expandDims(0);

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
  const [maxScores, classes] = helpers.calculateMaxScores(scores, 300, 1);

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

  const objects = helpers.buildDetectedObjects(
    width,
    height,
    boxes,
    maxScores,
    indexes,
    classes
  );

  results.gestures = objects;
  results.image = helpers.drawBoundingBox(canvasImage, objects);
  return results;
};

module.exports = {
  loadModels,
  detectClothing,
  detectGesture,
  convertText
};
