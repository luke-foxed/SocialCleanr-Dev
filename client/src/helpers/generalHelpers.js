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

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isValidURL = (str) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

module.exports = {
  asyncForEach,
  isValidURL,
};
