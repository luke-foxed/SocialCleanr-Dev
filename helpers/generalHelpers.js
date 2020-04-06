const crypto = require('crypto');
const config = require('config');
const uuid = require('uuid');

const ENCRYPTION_KEY = config.encryptionKey;
const IV_LENGTH = 16;

/**
 * Apply async await functionality to 'forEach' loop
 * @param {array} array - Items to be itterated
 * @param {object} callback - Value(s) to be retured from forEach
 */

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

/**
 * Encrypt text using AES-256 with random IV and secret key
 * @param {string} plaintext - Text to be encrypted
 * @return Encrypted text
 */

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
const encryptAES = (plaintext) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let encrypted = cipher.update(plaintext);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

/**
 * Decrypt ciphertext using secret key
 * @param {string} ciphertext - Text to be decrypted
 * @return Decrypted text
 */

const decrpytAES = async (ciphertext) => {
  let textParts = ciphertext.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

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

module.exports = {
  asyncForEach,
  encryptAES,
  decrpytAES,
  cleanResults,
};
