const { loadImage, createCanvas } = require('canvas');
const gm = require('gm');

export const cleanResults = results => {
  let flaggedContent = [];

  if (results['people'].length !== 0) {
    results['people'].forEach(person => {
      if (person.topless_prediction > 60) {
        flaggedContent.push({
          type: 'Unclothed Person',
          message:
            'A person with an innapropriate level of clothing has been found',
          probability: person.topless_prediction,
          box: person.bbox
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
        box: gesture.bbox
      });
    });
  }

  if (results['text'].length !== 0) {
    results['text'].forEach(item => {
      flaggedContent.push({
        type: 'Offensive Word',
        message: `The word ${item.text} has been flagged as ${item.reason}`,
        probability: '>80',
        box: item.bbox
      });
    });
  }

  // if no flagged content has been added, scan is clean
  if (flaggedContent.length === 0) {
  }

  return flaggedContent;
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
  loadedImage.crossOrigin = 'anonymous';
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

export const validationCheck = (models, image) => {
  let alertProps = { type: 'error', message: '' };

  if (models['clothing'] && models['gestures'] && models['text'] === false) {
    console.log('ERROR');
    alertProps.type = 'Please Select A Model';
  } else if (image === '') {
    alertProps.message = 'Please Upload An Image';
  }
  return alertProps;
};
