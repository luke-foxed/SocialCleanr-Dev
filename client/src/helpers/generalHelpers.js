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

module.exports = {
  asyncForEach
};
