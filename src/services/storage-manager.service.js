import CryptoJS from 'crypto-js';

const encrypt = text => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };
  
  const decrypt = data => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };

const get = key => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(decrypt(value)) : null;
}

const put = (key, value) => {
    if (value) {
        localStorage.setItem(key, encrypt(JSON.stringify(value)));
    }
}

const remove = key => {
    const value = localStorage.getItem(key);
    if (value) {
        localStorage.removeItem(key);
    }
    return localStorage.removeItem(key);
}

const clear = () => {
    localStorage.clear();
}

var exports = {
    encrypt,
    decrypt,
    get,
    put,
    remove,
    clear
}
export default exports;
