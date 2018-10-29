# Cryptocurrency sentiment
Charted Metrics from CoinGecko using React.

Demo: [https://klappy.github.io/cryptocurrency-sentiment]

## Why?
Many markets are tied to public perception. This is no different for the Cryptocurrency market. CoinGecko was the only API that had easy to access data that attempted to tap into this.

As I have refined my research on cryptocurrency trading, I found myself looking at these metrics as an indicator that was sometimes related. Usually a spike in developer commit activity, then followed by a spike Reddit comments as the price increased. a plateau or dip in activity was followed by a correction or decrease in price.

## APIs
While currently CoinGecko is the only API being consumed others will be added.

- CoinGecko API:
  - Great resource with lots of data including historical data.
  - Sadly their metric scores are not logged in their history and are proprietary. Calculating them isn't straightforward, but I value looking at the individual stats.
  - [https://www.coingecko.com/api/docs/v3#/]

## NPM Packages
As new packages are consumed they will be listed here. I believe in open source as well as giving credit to those who make the world a better place.

- React:
  - Framework for rapid prototyping.
- Material-UI:
  - Nice React components for UX.
  - [https://material-ui.com/getting-started/installation/]
- React Chartjs 2:
  - Simple charts to visualize metrics with little effort.
  - [https://www.npmjs.com/package/react-chartjs-2]
  - [https://github.com/jerairrest/react-chartjs-2/blob/master/example/src/components/line.js]
- Async:
  - Limit concurrent API calls to minimize IP ban.
  -  [http://caolan.github.io/async/docs.html#eachLimit]
- Moment:
  - Simple Date math and formatting:
  - [https://devhints.io/moment]
- gh-pages:
  - Deployment to host with minimal effort.
  -  [https://www.npmjs.com/package/gh-pages]
