const uuid = require('uuid');

/**
 * Extract flagged content from scan
 * @param {object} results - Raw data from scan
 * @param {string} content - Content (image/text) that was passed into scan, needed when cleaning imagesld
 * @return {array} List of only flagged items
 */

const cleanResults = (results, content) => {
  let flaggedContent = [];

  // keep count of each occurance to write to DB
  let count = {
    flagged_text: 0,
    flagged_clothing: 0,
    flagged_gesture: 0,
    flagged_age: 0,
  };

  if (results['people'].length !== 0) {
    results['people'].forEach((person) => {
      if (person.topless_prediction > 60) {
        count.flagged_clothing++;
        flaggedContent.push({
          type: 'Unclothed Person',
          message:
            'A person with an innapropriate level of clothing has been found',
          probability: person.topless_prediction,
          box: person.bbox,
          content: content,
          content_id: uuid.v4(),
        });
      }
    });
  }

  if (results['gestures'].length !== 0) {
    results['gestures'].forEach((gesture) => {
      count.flagged_gesture++;
      flaggedContent.push({
        type: 'Offensive Gesture',
        message: 'An offensive gesture has been detected in this image',
        probability: gesture.score,
        box: gesture.bbox,
        content: content,
        content_id: uuid.v4(),
      });
    });
  }

  if (results['text'].length !== 0) {
    results['text'].forEach((item) => {
      count.flagged_text++;
      flaggedContent.push({
        type: 'Offensive Word',
        message: `The word ${item.text} has been flagged as ${item.reason}`,
        probability: '>80',
        box: item.bbox,
        content: content,
        content_id: uuid.v4(),
      });
    });
  }

  if (results['age'].length !== 0) {
    results['age'].forEach((item) => {
      if (item.age < 5) {
        count.flagged_age++;
        flaggedContent.push({
          type: 'Child Detected',
          message: `A child below the age of 5 (aged ${item.age}) has been detected`,
          probability: item.probability,
          box: item.bbox,
          content: content,
          content_id: uuid.v4(),
        });
      }
    });
  }

  return { count, flaggedContent };
};

/**
 * Extract all photos and posts from Facebook API response
 * @param {object} response - Output from API call
 * @return {object} Object containing array of photos and texts
 */

const parseFacebookResults = (response) => {
  let cleanedResults = { photos: [], text: [], site: 'facebook' };

  response.posts.data.forEach((post) => {
    if (post['full_picture']) {
      cleanedResults.photos.push(post['full_picture']);
    }

    if (post['message']) {
      cleanedResults.text.push(post['message']);
    }
  });

  response.photos.data.forEach((photoArray) => {
    cleanedResults.photos.push(photoArray.images[0].source);
  });

  return cleanedResults;
};

/**
 * Extract all photos and posts from Twitter API response
 * @param {object} response - Output from API call
 * @return {object} Object containing array of photos and texts
 */

const parseTwitterResults = (response) => {
  let cleanedResults = { photos: [], text: [], site: 'twitter' };

  response.forEach((tweet) => {
    if (tweet.text) {
      cleanedResults.text.push(tweet.text);
    }

    if (tweet.extended_entities) {
      // ignore video thumbnails
      if (
        tweet.extended_entities.media[0].media_url.indexOf(
          'ext_tw_video_thumb'
        ) === -1
      ) {
        cleanedResults.photos.push(tweet.extended_entities.media[0].media_url);
      }
    }
  });

  return cleanedResults;
};

module.exports = {
  cleanResults,
  parseFacebookResults,
  parseTwitterResults,
};
