import CryptoJS from "crypto-js";
// Encrypt function
export const encrypt = (data, key) => {
  const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
  return ciphertext;
};

// Decrypt function
export const decrypt = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};