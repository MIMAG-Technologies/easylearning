const CryptoJS = require("crypto-js");
// Encrypt function
exports.encrypt = (data, key) => {
  const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
  return ciphertext;
};

// Decrypt function
exports.decrypt = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

