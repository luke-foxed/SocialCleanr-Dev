const jsdom = require('jsdom');
const { Canvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = jsdom;
const tf = require('@tensorflow/tfjs-node');
const modelPaths = require('./paths');
const tfImage = require('@teachablemachine/image');
const faceapi = require('face-api.js');
const generalHelpers = require('../helpers/generalHelpers');
const classificationHelpers = require('../helpers/classificationHelpers');
const cocoSSD = require('@tensorflow-models/coco-ssd');
const toxicity = require('@tensorflow-models/toxicity');

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
let toxicityModel = '';
let modelsLoaded = false;

// type of results
let results = {
  people: [],
  gestures: [],
  text: [],
  age: []
};

/**
 * Load classification/detection models once so they can be reused within session
 */

const loadModels = async () => {
  // clear results from previous scans
  results.people = results.gestures = results.text = results.age = [];

  if (modelsLoaded) {
    console.log('\nMODELS ALREADY LOADED\n');
  } else {
    maleClothingModel = await tfImage.load(
      modelPaths.maleModel.model,
      modelPaths.maleModel.metadata
    );

    console.log('\nLoaded Male Model...\n');

    femaleClothingModel = await tfImage.load(
      modelPaths.femaleModel.model,
      modelPaths.femaleModel.metadata
    );

    console.log('\nLoaded Female Model...\n');

    // taking the longest
    gestureModel = await tf.loadGraphModel(
      'file://classification/gestureDetection/model.json'
    );

    console.log('\nLoaded Gesture Model...\n');

    // load with threshold of 0.8
    toxicityModel = await toxicity.load(0.8);

    console.log('\nLoaded Toxicity Model...\n');

    personDetectionModel = await cocoSSD.load();

    console.log('\nLoaded CocoSSD Model...\n');

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('classification/faceAPI');
    await faceapi.nets.ageGenderNet.loadFromDisk('classification/faceAPI');

    console.log('\nLoaded FaceAPI Model...\n');

    modelsLoaded = true;
    console.log('\nMODELS LOADED \n');
  }
};

/**
 * Use CocoSSD to detect people in image
 * @param {string} image - Input image as base64
 * @returns {array} Array of images, one for each detected person
 */

const detectPeople = async image => {
  let boundingBoxes = [];
  let canvasImage = await classificationHelpers.createCanvasImage(image);
  let tensor = tf.browser.fromPixels(canvasImage);
  let results = await personDetectionModel.detect(tensor);
  results.forEach(element => {
    positiveBox = element.bbox.map(box => Math.abs(Math.round(box)));
    boundingBoxes.push(positiveBox);
  });

  // return array of images containing people
  let images = await classificationHelpers.boundingBoxesToImage(
    boundingBoxes,
    canvasImage
  );
  return images;
};

/**
 * Use FaceAPI to detect age and gender of people in image
 * @param {string} image - Input image as base64
 * @returns {object} Object containing age/gender detections
 */

const detectMultipleAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectAllFaces(img).withAgeAndGender();
  ageGenderResults.forEach(person => {
    let box = person.detection.box;
    results.age.push({
      gender: person.gender,
      age: Math.round(person.age),
      probability: Math.round(100 * person.detection.classScore),
      bbox: [box._x, box._y, box._width, box._height]
    });
  });

  return results;
};

/**
 * Use FaceAPI to detect age and gender of single person
 * @param {string} image - Input image as base64
 * @returns {object} Object containing age/gender detections
 */

const detectAgeGender = async image => {
  let img = await loadImage(image);
  let ageGenderResults = await faceapi.detectSingleFace(img).withAgeAndGender();
  let detectedFace = {};

  if (ageGenderResults !== undefined)
    detectedFace = {
      gender: ageGenderResults.gender,
      age: ageGenderResults.age
    };
  else {
    console.log('No faces detected');
    detectedFaces = {
      gender: 'unknown',
      age: 'unknown'
    };
  }

  return detectedFace;
};

/**
 * Detect innapropriate level of clothing
 * @param {string} image - Input image as base64
 * @returns {object} Object containing clothing detections
 */

const detectClothing = async image => {
  results = {
    people: [],
    gestures: [],
    text: [],
    age: []
  };

  let people = await detectPeople(image);
  let peopleAgeGender = [];
  let classifcation = [];

  await generalHelpers.asyncForEach(people, async person => {
    let detection = await detectAgeGender(person.image);

    peopleAgeGender.push({
      ...person,
      gender: detection.gender,
      age: detection.age
    });
  });

  await generalHelpers.asyncForEach(peopleAgeGender, async person => {
    let image = await loadImage(person.image);

    if (person.gender === 'male') {
      classifcation = await maleClothingModel.predict(image);
    }
    if (person.gender === 'female') {
      classifcation = await femaleClothingModel.predict(image);
    }

    if (classifcation.length > 0 && classifcation[0].probability > 0.7) {
      results.people.push({
        gender: person.gender,
        topless_prediction: Math.round(100 * classifcation[0].probability),
        age: Math.round(person.age),
        bbox: person.bbox,
        image: image
      });
    }
  });

  return results;
};

/**
 * Detect offensive or explicit text
 * @param {string} text - Input text
 * @returns {object} Object containing offensive text detections
 */

const detectText = async text => {
  let words = text.trim().split(' ');
  await generalHelpers.asyncForEach(words, async word => {
    try {
      let predictions = await toxicityModel.classify(word);
      predictions.forEach(prediction => {
        if (prediction.results[0].match === true) {
          results.text.push({
            text: word,
            reason: prediction.label
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  return results;
};

/**
 * Detect offensive or explicit text from image
 * @param {string} image - Input image
 * @returns {object} Object containing offensive text detections
 */

const detectTextFromImage = async image => {
  let text = await classificationHelpers.convertToText(image);

  if (text.length > 0) {
    await generalHelpers.asyncForEach(text, async item => {
      try {
        let predictions = await toxicityModel.classify(item.word);
        predictions.forEach(prediction => {
          if (prediction.results[0].match === true) {
            results.text.push({
              text: item.word,
              reason: prediction.label,
              bbox: item.bbox
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  return results;
};

/**
 * Detect offensive gestures using trained gesture detection model
 * @param {string} text - Input image
 * @returns {object} Object containing offensive gestures
 */

const detectGesture = async image => {
  results = {
    people: [],
    gestures: [],
    text: [],
    age: []
  };

  let canvasImage = await classificationHelpers.createCanvasImage(image);
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

  // 300 represents required tensor shape
  const [maxScores, classes] = classificationHelpers.calculateMaxScores(
    scores,
    300,
    1
  );

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

  const objects = classificationHelpers.buildDetectedObjects(
    width,
    height,
    boxes,
    maxScores,
    indexes,
    classes
  );

  if (objects.length > 0) {
    objects.forEach(gesture => {
      if (gesture.score > 0.7) {
        results.gestures.push({
          type: gesture.class,
          score: Math.round(100 * gesture.score),
          bbox: gesture.bbox
        });
      }
    });
  } else {
    console.log('No gestures detected');
  }

  return results;
};

module.exports = {
  loadModels,
  detectClothing,
  detectGesture,
  detectText,
  detectTextFromImage,
  detectMultipleAgeGender
};
