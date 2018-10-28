import React from 'react';
import CoinManager from './CoinManager';

import * as helpers from '../helpers/CoinGeckoHelpers';

let coins = [];
helpers.coins()
.then(data => { coins = data });

const CoinManagerContainer = (props) =>
  <CoinManager
    {...props}
    coins={coins}
  />

export default CoinManagerContainer;
