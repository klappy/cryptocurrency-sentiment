import React from 'react';

import Application from './Application';
import './Application.css';

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinIds: [],
    }
  };

  componentDidMount() {
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
        coinIds={this.state.coinIds}
        addCoinId={this.addCoinId.bind(this)}
        removeCoinId={this.removeCoinId.bind(this)}
      />
    );
  };
};

export default ApplicationContainer;
