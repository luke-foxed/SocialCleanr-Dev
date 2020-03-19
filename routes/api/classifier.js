const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../../middleware/auth');
const classification = require('../../classification/classification');
const helpers = require('../../helpers/generalHelpers');
const User = require('../../models/User');
require('@tensorflow/tfjs-node');

router.post('/get-image', async (req, res) => {
  let response = await axios.get(req.body.image, {
    responseType: 'arraybuffer'
  });

  let base64 = Buffer.from(response.data, 'binary').toString('base64');
  res.end(base64);
});

router.post('/custom-scan', auth, async (req, res) => {
  try {
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
          textResults = await classification.detectTextFromImage(
            req.body.image
          );
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

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'statistics.0.custom_scans': 1 }
    });

    res.status(200).send(results);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ msg: 'There was an error while performing this scan' });
  }
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

router.post('/write-statistics', auth, async (req, res) => {
  try {
    let count = req.body;

    console.log(count);

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        'statistics.0.flagged_text': count['flagged_text'],
        'statistics.0.flagged_age': count['flagged_age'],
        'statistics.0.flagged_gesture': count['flagged_gesture'],
        'statistics.0.flagged_clothing': count['flagged_clothing']
      }
    });

    res.status(200).json({ msg: 'Stats written to DB' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
