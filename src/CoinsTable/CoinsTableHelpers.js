import path from 'path';
import moment from 'moment';
import {each} from 'async';
const request = require('request-promise');

const href = 'http://d28x6bs9o8a1xt.cloudfront.net/';
const baseUri = 'api/v1/';

export const availableDates = () => new Promise((resolve, reject) => {
  let dates = [];
  const days = [0,1];
  each(days,
    (day, done) => {
      const date = moment().subtract(day, 'days').format('YYYY-MM-DD');
      uriExists(uriFromDate(date))
      .then((exists) => {
        if (exists) dates.push(date);
        done();
      });
    },
    (error) => { console.log(error); reject(error); }
  );
  resolve(dates);
});

export const uriFromDate = (date) => {
  return href + path.join(baseUri, 'history', date, 'coins' );
}

export const uriExists = (uri) => new Promise((resolve) => {
  request({uri: uri, method: 'HEAD', resolveWithFullResponse: true})
  .then((response) => resolve(true) )
  .catch((error) => resolve(false) );
});

export const modifyCoinData = (coin) => {
  let coinData = Object.keys(columnData).map(columnKey => {
    let value = '';
    if (coin[columnKey]) value = coin[columnKey];
    if (columnKey === 'coin')
      value = coin['coingecko_rank'] + '. ' +
        coin['symbol'].toUpperCase() + ': ' + coin['name'];
    return  value || 0;
  });
  return coinData;
}

export const coinTableDataByDate = (date) => new Promise((resolve, reject) => {
  const columns = Object.keys(columnData).map(columnKey => columnData[columnKey]);
  getDataByDate(date, 'array').then(coinArray => {
    const data = coinArray.map((coin, index) => {
      return modifyCoinData(coin);
    });
    resolve({ columns: columns, data: data, coins: coinArray });
  });
});

// Private

const columnData = {
  coin: 'Symbol: Name',
  market_cap_rank: 'MarketCap',
  coingecko_score: 'CoinGecko',
  developer_score: 'Developer',
  community_score: 'Community',
  liquidity_score: 'Liquidity',
  public_interest_score: 'SearchEngine',
};

const deltaFields = [
  'coingecko_rank',
  'market_cap_rank',
  'coingecko_score',
  'developer_score',
  'community_score',
  'liquidity_score',
  'public_interest_score',
];


const getDataByDates = () => new Promise((resolve, reject) => {
  let dataByDates = {};
  availableDates('object').then(dates => {
    each(dates,
      (date, done) => {
        getDataByDate(date, 'object').then(data => {
          dataByDates[date] = data;
          done();
        });
      },
      (error) => {
        if (error) console.log(error);
        resolve(dataByDates);
      }
    );
  });
});

// export const delta = () => {
//   const columnData = columnData;
//   const columns = Object.keys(columnData).map(columnKey => columnData[columnKey]);
//   const dataByDates = _dataByDates();
//   Object.keys(dataByDates).forEach(date => {
//     const dataByDate = dataByDates[date];
//
//   });
//   const data = coins.map((coin, index) => {
//
//     return coinData;
//   });
//   return { columns: columns, data: data };
// };

const getDataByDate = (date) => new Promise((resolve, reject) => {
  let coinsUri = 'coins';
  if (date) coinsUri = path.join('history', date, 'coins');
  get(coinsUri).then(data => {
    resolve(data);
  });
});

const get = (_uri) => new Promise((resolve, reject) => {
  const uri = href + baseUri + _uri;
  const options = {
    method: 'GET',
    uri: uri,
    json: true,
  };
  request(options)
  .then(data => resolve(data) )
  .catch(error => reject(error) );
});
