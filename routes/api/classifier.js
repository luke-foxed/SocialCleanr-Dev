const express = require('express');
const axios = require('axios');
const router = express.Router();
const classification = require('../../classification/classification');
const helpers = require('../../helpers/generalHelpers');
require('@tensorflow/tfjs-node');

router.post('/get-image', async (req, res) => {
  let response = await axios.get(req.body.image, {
    responseType: 'arraybuffer'
  });

  let base64 = Buffer.from(response.data, 'binary').toString('base64');
  res.end(base64);
});

router.post('/filter_models', async (req, res) => {
  await classification.loadModels();
  let results = {};
  let gestureResults = (ageResults = clothingResults = textResults = []);
  let selection = req.body.models;

  await helpers.asyncForEach(selection, async model => {
    switch (model) {
      case 'age':
        console.log('\nSELECTED AGE\n');
        ageResults = await classification.detectMultipleAgeGender(
          req.body.image
        );
        break;
      case 'text':
        console.log('\nSELECTED TEXT\n');
        textResults = await classification.detectTextFromImage(req.body.image);
        break;
      case 'clothing':
        console.log('\nSELECTED CLOTHING\n');
        clothingResults = await classification.detectClothing(req.body.image);
        break;
      case 'gestures':
        console.log('\nSELECTED GESTURE\n');
        gestureResults = await classification.detectGesture(req.body.image);
        break;
    }
  });

  results.people = clothingResults.people || [];
  results.gestures = gestureResults.gestures || [];
  results.text = textResults.text || [];
  results.age = ageResults.age || [];

  res.send(results);
});

router.post('/automated-scan', async (req, res) => {
  await classification.loadModels();
  let results = {};
  let gestureResults = (ageResults = clothingResults = textResults = []);

  try {
    if (req.body.type === 'photos') {
      gestureResults = await classification.detectGesture(req.body.data);
      clothingResults = await classification.detectClothing(req.body.data);
      textResults = await classification.detectTextFromImage(req.body.data);
      ageResults = await classification.detectMultipleAgeGender(req.body.data);
    } else if (req.body.type === 'text') {
      textResults = await classification.detectText(req.body.data);
    }

    results.people = clothingResults.people || [];
    results.gestures = gestureResults.gestures || [];
    results.text = textResults.text || [];
    results.age = ageResults.age || [];

    res.send(results);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
