import React from 'react';
import CoinManager from './CoinManager';


class CoinManagerContainer extends React.Component {
  state = {
  };

  render() {
    let props = this.props;
    return (
      <CoinManager
        {...props}
      />
    );
  }
}

export default CoinManagerContainer;
