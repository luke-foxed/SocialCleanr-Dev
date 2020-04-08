import { loadImage, createCanvas } from 'canvas';
import { getImageAsBase64 } from '../actions/scan';

const helpers = require('./generalHelpers');

/**
 * Draw bounding box on image from URL
 * @param {string} imageURL - URL of image to draw on
 * @param {object} box - Coordinates for bounding box
 * @return {string} Image with drawing as base64 string
 */

export const drawBoundingBoxURL = async (imageURL, box) => {
  let base64 = await getImageAsBase64(imageURL);
  let image = await drawBoundingBox(base64, box);
  return image;
};

/**
 * Draw blurring box on image from URL
 * @param {string} imageURL - RL of image to draw on
 * @param {object} box - Coordinates of area to blur
 * @return {string} Image with blurred region as base64 string
 */

export const drawBlurringBoxURL = async (imageURL, box) => {
  let base64 = await getImageAsBase64(imageURL);
  let image = await drawBlurringBox(base64, box);
  return image;
};

/**
 * Draw bounding box on image via canvas
 * @param {string} image - Base64 string of image
 * @param {object} box - Coordinates for bounding box
 * @return {string} Image as base64 string
 */

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

/**
 * Draw blurring box on image via canvas
 * @param {string} image - Base64 string of image
 * @param {object} box - Coordinates of area to blur
 * @return {string} Image with blurred region as base64 string
 */

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

/**
 * Create canvas element with image drawn on
 * @param {string} base64Image - Base64 string of image to draw on
 * @return {Canvas} Canvas element that can be used to draw bbox on
 */

const createCanvasImage = async (base64Image) => {
  const image = await loadImage(base64Image);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

/**
 * Apply blurring to image using boxes from all flagged content by looping and layering each drawing onto image
 * @param {string} image - Base64 string of image to draw on
 * @param {array} boxes - Array of all box coordinates from each flagged item
 * @return {string} Image with all blurring boxes drawn
 */

export const blurAllContent = async (image, boxes) => {
  let cleanedImage = image;

  await helpers.asyncForEach(boxes, async (box) => {
    cleanedImage = await drawBlurringBox(cleanedImage, box);
  });

  return cleanedImage;
};

/**
 * Create href link containing cleaned image that is automatically clicked to download
 * @param {string} image - Base64 string of image to download
 */

export const createDownloadImage = (image) => {
  const a = document.createElement('a');
  a.href = image;
  a.download = 'cleaned_image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
