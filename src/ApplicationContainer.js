import React from 'react';

import Application from './Application';
import './Application.css';

import * as ApplicationHelpers from './ApplicationHelpers';

class ApplicationContainer extends React.Component {
  state = {
    coins: [],
    coinIds: ['ravencoin'],
  };

  componentDidMount() {
    ApplicationHelpers.coins()
    .then(data => {
      this.setState({
        coins: data
      });
    });
  };

  addCoinId(coinId) {
    let {coinIds} = this.state;
    if (!coinIds.includes(coinId)) {
      coinIds.push(coinId);
      this.setState({coinIds: coinIds});
    }
  }

  removeCoinId(coinId) {
    let {coinIds} = this.state;
    if (coinIds.includes(coinId)) {
      coinIds.splice( coinIds.indexOf(coinId), 1 );
      this.setState({coinIds: coinIds});
    }
  }

  render() {
    return (
      <Application
        coins={this.state.coins}
        coinIds={this.state.coinIds}
        addCoinId={this.addCoinId.bind(this)}
        removeCoinId={this.removeCoinId.bind(this)}
      />
    );
  };
};

export default ApplicationContainer;
