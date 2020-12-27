import constants from './constant.service';
import session from './session-manger.service';
import { trackPromise } from 'react-promise-tracker';

function authToken() {
  const user = session.user.userToken();
  return user;
}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

const get = (url, options = {}) => {
  const { idToken } = authToken();
  const headers = {};
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`
  }
  const serviceOptions = {};
  serviceOptions.method = 'GET';
  serviceOptions.options = options;
  if (idToken) {
    serviceOptions.headers = headers;
  }
  return new Promise((resolve, reject) => {
    trackPromise(fetch(constants.api + url, serviceOptions)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      }));
  });
};

const post = (url, data, qParams) => {
  if (url && url === 'signInWithPassword') {
    url = constants.host + url;
  } else {
    url = constants.api + url;
  }
  const queryString = objToQueryString(qParams);
  const { idToken } = authToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`
  }
  const serviceOptions = {};
  serviceOptions.method = 'POST';
  serviceOptions.body = JSON.stringify(data);
  serviceOptions.headers = headers;
  return new Promise((resolve, reject) => {
    trackPromise(fetch(`${url}?${queryString}`, serviceOptions)
      .then((res) => res.json())
      .then(dataApi => {
        if (dataApi.error) {
          console.log('err', dataApi.error)
          //reject(new Error(dataApi.message))
        } else {
          console.log(dataApi)
          resolve(dataApi);
        }
      })
      .catch(error => {
        reject(error);
      }));
  });
};

const uploadImage = (url, data) => {
  console.log(url, data)
  try {
    return new Promise((resolve, reject) => {
      const contentType = 'application/json';
      fetch(constants.api + url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': contentType,
        },
        body: data,
      })
        .then((res) => console.log(res))
      // .then(dataApi => {
      //   if (dataApi.error) {
      //    console.log('Upload URL',dataApi.error)
      //     //reject(new Error(dataApi.message))
      //   } else {
      //     console.log("Upload response ",dataApi)
      //     resolve(dataApi);
      //   }
      // })   
    })
  } catch (error) {
    console.log("upload error", error)
  }
}

const fetchServices = {
  get,
  post,
  uploadImage
}
export default fetchServices;
