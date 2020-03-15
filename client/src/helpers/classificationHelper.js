import { loadImage, createCanvas } from 'canvas';
import { getImageAsBase64 } from '../actions/scan';

const helpers = require('./generalHelpers');

export const cleanResults = (results, content) => {
  let flaggedContent = [];

  if (results['people'].length !== 0) {
    results['people'].forEach(person => {
      if (person.topless_prediction > 60) {
        flaggedContent.push({
          type: 'Unclothed Person',
          message:
            'A person with an innapropriate level of clothing has been found',
          probability: person.topless_prediction,
          box: person.bbox,
          content: content
        });
      }
    });
  }

  if (results['gestures'].length !== 0) {
    results['gestures'].forEach(gesture => {
      flaggedContent.push({
        type: 'Offensive Gesture',
        message: 'An offensive gesture has been detected in this image',
        probability: gesture.score,
        box: gesture.bbox,
        content: content
      });
    });
  }

  if (results['text'].length !== 0) {
    results['text'].forEach(item => {
      flaggedContent.push({
        type: 'Offensive Word',
        message: `The word ${item.text} has been flagged as ${item.reason}`,
        probability: '>80',
        box: item.bbox,
        content: content
      });
    });
  }

  if (results['age'].length !== 0) {
    results['age'].forEach(item => {
      if (item.age < 5) {
        flaggedContent.push({
          type: 'Child Detected',
          message: `A child below the age of 5 (aged ${item.age}) has been detected`,
          probability: item.probability,
          box: item.bbox,
          content: content
        });
      }
    });
  }

  return flaggedContent;
};

export const drawBoundingBoxURL = async (imageURL, box) => {
  let base64 = await getImageAsBase64(imageURL);
  let image = await drawBoundingBox(base64, box);
  return image;
};

export const drawBlurringBoxURL = async (imageURL, box) => {
  let base64 = await getImageAsBase64(imageURL);
  let image = await drawBlurringBox(base64, box);
  return image;
};

export const drawBoundingBox = async (image, box) => {
  const canvasImage = await createCanvasImage(image);
  const ctx = canvasImage.getContext('2d');

  ctx.beginPath();
  ctx.rect(box[0], box[1], box[2], box[3]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.stroke();

  return canvasImage.toDataURL();
};

export const drawBlurringBox = async (image, box) => {
  const loadedImage = await loadImage(image);
  const canvas = await createCanvasImage(image);
  const ctx = canvas.getContext('2d');
  ctx.filter = 'blur(50px)';
  ctx.drawImage(loadedImage, 0, 0);
  const imgData = ctx.getImageData(box[0], box[1], box[2], box[3]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';
  ctx.drawImage(loadedImage, 0, 0);
  ctx.putImageData(imgData, box[0], box[1]);

  return canvas.toDataURL();
};

const createCanvasImage = async base64Image => {
  const image = await loadImage(base64Image);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const blurAllContent = async (image, boxes) => {
  let cleanedImage = image;

  await helpers.asyncForEach(boxes, async box => {
    cleanedImage = await drawBlurringBox(cleanedImage, box);
  });

  return cleanedImage;
};

export const createDownloadImage = image => {
  const a = document.createElement('a');
  a.href = image;
  a.download = 'cleaned_image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
