const request = require('request-promise');

export const history = (id, date) =>
  new Promise((resolve, reject) => {
    const uri = 'coins/' + id + '/history?date=' + date;
    get(uri)
    .then(data => resolve(data) );
  });

export const coin = (id) =>
  new Promise((resolve, reject) => {
    const uri = 'coins/' + id;
    get(uri)
    .then(data => resolve(data) );
  });

export const coins = () =>
  new Promise((resolve, reject) => {
    const uri = 'coins/?per_page=500';
    get(uri)
    .then(data => resolve(data) );
  });

const get = (_uri) =>
  new Promise((resolve, reject) => {
    const uriBase = 'https://api.coingecko.com/api/v3/'
    const uri = uriBase + _uri;
    const options = {
      method: 'GET',
      uri: uri,
      json: true,
    };
    request(options)
    .then(data => resolve(data) )
    .catch(error => reject(error) );
  });
