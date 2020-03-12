const config = require('config');
const AES = require('crypto-js/aes');
const enctf8 = require('crypto-js/enc-utf8');

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const encryptAES = plaintext => {
  return AES.encrypt(plaintext, config.get('cryptoPassphrase')).toString();
};

const decrpytAES = async ciphertext => {
  return AES.decrypt(ciphertext, config.get('cryptoPassphrase')).toString(
    enctf8
  );
};

module.exports = {
  asyncForEach,
  encryptAES,
  decrpytAES
};
