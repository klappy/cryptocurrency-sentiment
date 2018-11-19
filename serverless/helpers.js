var path = require('path');
var moment = require('moment-timezone');
var request = require('promise-request-retry');
var eachLimit = require('async/eachLimit');
var AWS = require('aws-sdk');

var helpers = require('./CoinGeckoHelpers');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
})
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
});
const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
});

const baseDir = 'api/v1/';
const href = 'http://d28x6bs9o8a1xt.cloudfront.net/';
const baseUri = 'api/v1/';

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

module.exports.queueCoins = (limit=4000) => new Promise((resolve, reject) => {
  helpers.coinList().then(coins => {
    const max = Math.min(coins.length, limit);
    eachLimit(coins.splice(0, max), 1000,
      (coin, done) => {
        const params = {
          QueueUrl: "https://sqs.us-east-1.amazonaws.com/857100849259/CoinGeckoScores-Coins",
          MessageBody: JSON.stringify({id: coin.id}),
        };
        sqs.sendMessage(params, function(error, data) {
          if (error) console.log("Error:", error);
          // else console.log("Success:", data.MessageId);
          done(error);
        });
      },
      (error, data) => {
        if (error) reject(error);
        resolve('Coins queued: ' + max);
      }
    );
  }).catch(error => reject(error));
});

module.exports.saveCoin = (id) => new Promise((resolve, reject) => {
  fetchCoinSource(id).then(data => {
    const coinPath = path.join('coins', id);
    uploadDataFiles(coinPath, data).then(()=>{
      resolve(data);
    }).catch((error) => reject(error));
  }).catch((error) => reject(error));
});

module.exports.rollupCoins = (limit=200) => new Promise((resolve, reject) => {
  console.time('rollupCoins()');
  helpers.coinList().then(coins => {
    let coinsArray = [];
    let completed = 0;
    let coinsWithErrors = [];
    eachLimit(coins, limit,
      (coin, done) => {
        fetchCoin(coin.id).then(data => {
          if (data) {
            coinsArray[data.coingecko_rank-1] = data;
            completed = completed + 1;
            done(null);
          } else {
            coinsWithErrors.push(coin.id);
            done(coin.id + ' was empty!')
          }
        }).catch((error) => {
          coinsWithErrors.push(coin.id);
          console.log(error);
          done(error);
        });
      },
      (error, results) => {
        const emptyCoin = coinsArray.indexOf(null);
        if (error || emptyCoin > -1) {
          console.timeEnd('rollupCoins()');
          console.log('There was an error!', error);
          console.log('Empty Coin Index: ', emptyCoin);
          console.log(coinsWithErrors);
          reject(error);
        } else {
          if (coinsWithErrors.length === 0) {
            uploadDataFiles('coins', coinsArray)
            .then(()=>{
              console.timeEnd('rollupCoins()');
              const message = completed + ' coins updated!';
              console.log(message);
              resolve(message);
            }).catch((error) => {console.error(error); reject(error)});
          } else {
            console.timeEnd('rollupCoins()');
            console.log(coinsWithErrors);
            reject('Fetching coins had errors and had to stop.')
          }
        }
      }
    );
  });
});

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
      if (error) reject(error);
      if (data) resolve({data: data, filepath: filepath});
    }
  );
});

const uploadDataFiles = (resourcePath, filedata) => new Promise((resolve, reject) => {
  const date = moment().tz('America/New_York').format('YYYY-MM-DD');
  const dateFilepath = path.join(baseDir, 'history', date, resourcePath);
  s3upload(dateFilepath, filedata)
  .then(response => resolve(response))
  .catch(error => reject(error));
});

const fetchCoinSource = (id) => new Promise((resolve, reject) => {
  const options = {
    localization: false,
    tickers: false,
    market_data: false,
    community_data: false,
    developer_data: false,
  }
  helpers.coin(id, options).then(coinObject => {
    let data = {
      id: coinObject.id,
      symbol: coinObject.symbol,
      name: coinObject.name,
    };
    Object.keys(dataKeys).forEach(key => {
      data[key] = coinObject[key];
    });
    resolve(data);
  }).catch((error) => { reject(error) });
});

const get = (_uri, retryCount=4) => new Promise((resolve, reject) => {
  const uri = href + baseUri + _uri;
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

const fetchCoin = (id) => new Promise((resolve, reject) => {
  const uri = path.join('coins', id);
  get(uri)
  .then(data => resolve(data))
  .catch(error => reject(error));
});
