#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var moment = require('moment');
var mapLimit = require('async/eachLimit');

var helpers = require('../src/ApplicationHelpers');

const dataKeys = {
  market_cap_rank: 'Market Cap Rank',
  coingecko_rank: 'CoinGecko Rank',
  coingecko_score: 'CoinGecko Score',
  developer_score: 'Developer Score',
  community_score: 'Community Score',
  liquidity_score: 'Liquidity Score',
  public_interest_score: 'Public Interest Score',
  last_updated: "Timestamp",
};

//  REST API via fs =>
// /api/v1/coins/{symbol}/{YYYY-MM-DD}.json
// also update the latest
// /coins/{symbol}.json

const writeFileFromData = (name, data) => {
  return new Promise((resolve, reject) => {
    const basePath = path.join(__dirname, '..', 'src', 'data', 'api', 'v1');
    const date = moment().format('YYYY-MM-DD');
    const filenameDate = date + '.json';
    const filepathDate = path.join(basePath, name, filenameDate);
    const filenameLatest = name + '.json';
    const filepathLatest = path.join(basePath, filenameLatest);
    const fileContents = JSON.stringify(data, null, 2);
    mkdirp(path.join(basePath, name), (error) => {
      if (error) console.log(error);
      fs.writeFile(filepathDate, fileContents, 'utf8', (_error) => {
        if (_error) console.log(_error);
        fs.writeFile(filepathLatest, fileContents, 'utf8', (__error) => {
          if (__error) console.log(__error);
          resolve();
        });
      });
    });
  });
};

const fetchCoin = (coin) => {
  return new Promise((resolve, reject) => {
    const options = {
      localization: false,
      tickers: false,
      market_data: false,
      community_data: false,
      developer_data: false,
    }
    helpers.coin(coin.id, options).then(coinObject => {
      let data = {
        id: coinObject.id,
        symbol: coinObject.symbol,
        name: coinObject.name,
      };
      Object.keys(dataKeys).forEach(key => {
        data[key] = coinObject[key];
      });
      resolve(data);
    });
  });
};

const fetchAllScores = (max=4000, limit=8) => {
  console.time('fetchAllScores()');
  const start = new Date().getTime();
  helpers.coinList().then(coins => {
    const total = (coins.length < max) ? coins.length : max;
    let coinsObject = {};
    let coinsArray = [];
    let top250 = [];
    let completed = 0;
    mapLimit(coins.splice(0, total), limit,
      (coin, done) => {
        const beforeFetchTime = new Date().getTime();
        fetchCoin(coin).then(data => {
          coinsObject[data.id] = data;
          coinsArray[data.coingecko_rank-1] = data;
          if (data.coingecko_rank <=250) {
            top250[data.coingecko_rank-1] = data;
          }
          const afterFetchTime = new Date().getTime();
          const fetchTime = afterFetchTime - beforeFetchTime;
          const msDelay = (fetchTime > 900) ? 0 : 900 - fetchTime;
          setTimeout(()=>{
            completed = completed + 1;
            const progress = (completed / total * 100).toFixed(2);
            const now = new Date().getTime();
            const timer = ((now - start)/1000).toFixed(1);
            console.log(
              progress + '%',
              timer + 's,',
              coin.symbol, '-',
              coin.name,
              'time:', fetchTime, 'ms,',
              'delay:', msDelay, 'ms,',
            );
            done(null, data);
          }, msDelay);
        });
      },
      (error, results) => {
        writeFileFromData('object', coinsObject).then(()=>{
          writeFileFromData('array', coinsArray).then(()=>{
            writeFileFromData('top250', top250).then(()=>{
              console.log(completed + ' coins updated!');
              console.timeEnd('fetchAllScores()');
            });
          });
        });
      }
    );
  });
}

fetchAllScores();
