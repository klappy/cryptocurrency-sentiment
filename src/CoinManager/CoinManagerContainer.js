import React from 'react';
import CoinManager from './CoinManager';

import * as helpers from '../helpers/CoinGeckoHelpers';

class CoinManagerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
  };

  componentDidMount() {
    helpers.coins()
    .then(data => {
      this.setState({
        coins: data
      });
    });
  };

  render() {
    let props = this.props;
    return(
      <CoinManager
        {...props}
        coins={this.state.coins}
      />
    );
  }
}

export default CoinManagerContainer;
