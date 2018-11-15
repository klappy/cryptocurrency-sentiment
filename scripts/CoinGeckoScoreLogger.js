#!/usr/bin/env node

var path = require('path');
var moment = require('moment');
var eachLimit = require('async/eachLimit');

var helpers = require('../src/ApplicationHelpers');

const AWS = require('aws-sdk');
const s3Keys = {
  accessKeyId: 'AKIAJU44PKAMK6ER4SZA',
  secretAccessKey: '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',
};
const s3 = new AWS.S3({
  // accessKeyId: process.env.AWS_ACCESS_KEY,
  accessKeyId: s3Keys.accessKeyId,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  secretAccessKey: s3Keys.secretAccessKey,
});
const baseDir = 'api/v1/';


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

// REST API via fs =>
// # update the latest
// => /api/v1/coins/{id}
// # log data to the history of the coin
// => /api/v1/coins/{id}/history/{YYYY-MM-DD}
// # aggregate all coin data for today
// => /api/v1/coins
// # log data to the history of all coins
// => /api/v1/coins/history/{YYYY-MM-DD}

const s3upload = (filepath, fileContents) => new Promise((resolve, reject) => {
  s3.putObject(
    {
      Bucket: 'coingecko-scores',
      Key: filepath,
      Body: JSON.stringify(fileContents, null, 2),
      ContentType: "application/json",
      ACL: "public-read",
    },
    (error, data) => {
      if (error) {console.error(error); reject(error);}
      if (data) console.log(data, filepath);
      resolve();
    }
  );
});

const uploadDataFiles = (resourcePath, filedata) => new Promise((resolve, reject) => {
  const date = moment().format('YYYY-MM-DD');
  const dateFilepath = path.join(baseDir, 'history', date, resourcePath);
  const latestFilepath = path.join(baseDir, resourcePath);
  s3upload(dateFilepath, filedata)
  .then(response => {
    s3upload(latestFilepath, filedata)
    .then(_response => resolve())
    .catch(_error => reject(_error));
  })
  .catch(error => reject(error));
});

const fetchCoin = (coin) => new Promise((resolve, reject) => {
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
  }).catch((error) => {console.error(error); reject(error)});
});

const fetchAllScores = (max=4000, limit=10) => new Promise((resolve, reject) => {
  const msMinimumTime = 1000/10*limit;
  console.time('fetchAllScores()');
  const start = new Date().getTime();
  helpers.coinList().then(coins => {
    const total = (coins.length < max) ? coins.length : max;
    let coinsArray = [];
    let completed = 0;
    let coinsWithErrors = [];
    eachLimit(coins.splice(0, total), limit,
      (coin, done) => {
        const beforeCoinTime = new Date().getTime();
        fetchCoin(coin).then(data => {
          coinsArray[data.coingecko_rank-1] = data;
          const coinPath = path.join('coins', data.id);
          uploadDataFiles(coinPath, data).then(()=>{
            const afterCoinTime = new Date().getTime();
            const coinTime = afterCoinTime - beforeCoinTime;
            const msDelay = (coinTime > msMinimumTime) ? 0 : msMinimumTime - coinTime;
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
                'time:', coinTime, 'ms,',
                'delay:', msDelay, 'ms,',
              );
              done(null, data);
            }, msDelay);
          })
        }).catch((error) => {
          coinsWithErrors.push(coin.id);
          console.error(error);
          done(null, {});
        });
      },
      (error, results) => {
        if (error) {
          console.error(error); reject(error);
        } else {
          if (coinsWithErrors.length === 0) {
            uploadDataFiles('coins', coinsArray).then(()=>{
              console.log(completed + ' coins updated!');
              console.timeEnd('fetchAllScores()');
              resolve();
            }).catch((error) => {console.error(error); reject(error)});
          } else {
            console.error(coinsWithErrors);
            reject('Fetching coins had errors and had to stop.')
          }
        }
      }
    );
  });
});

fetchAllScores();
