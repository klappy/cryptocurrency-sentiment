const request = require('promise-request-retry');

module.exports = {
  history: (id, date) =>
    new Promise((resolve, reject) => {
      const uri = 'coins/' + id + '/history?date=' + date;
      get(uri)
      .then(data => resolve(data) );
    }),

  coin: (id, options={}) =>
    new Promise((resolve, reject) => {
      const params = Object.keys(options)
        .map(key => key + '=' + options[key])
        .join('&');
      const uri = 'coins/' + id + '?' + params;
      get(uri)
      .then(data => resolve(data) );
    }),

  coins: () =>
    new Promise((resolve, reject) => {
      const uri = 'coins/?per_page=250'; // 250 max
      get(uri)
      .then(data => resolve(data) );
    }),
  coinList: () =>
    new Promise((resolve, reject) => {
      const uri = 'coins/list'; // 250 max
      get(uri)
      .then(data => resolve(data) );
    }),
}

const get = (_uri, retryCount=4) => new Promise((resolve, reject) => {
  const uriBase = 'https://api.coingecko.com/api/v3/'
  const uri = uriBase + _uri;
  const options = {
    method: 'GET',
    uri: uri,
    json: true,
    retry: retryCount,
  };
  request(options)
  .then(data => resolve(data) )
  .catch(error => reject(error) );
});
