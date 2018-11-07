import React from 'react';
import PropTypes from 'prop-types';

import CoinCard from './CoinCard';
import * as ApplicationHelpers from '../ApplicationHelpers';

class CoinCardContainer extends React.Component {
  state = {
    expanded: false,
    coinObject: null,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    const {coinId} = this.props;
    if (coinId) {
      ApplicationHelpers.coin(coinId)
      .then(data => {
        this.setState({
          coinObject: data
        });
      });
    }
  };

  render() {
    const props = this.props;
    let {
      coinObject
    } = this.state;
    const coinCard = (
      <CoinCard
        {...props}
        coinObject={coinObject}
        handleExpandClick={this.handleExpandClick.bind(this)}
        expanded={this.state.expanded}
      />
    );
    const component = this.state.coinObject ? coinCard : <div />
    return component;
  };
};

CoinCardContainer.propTypes = {
  coinId: PropTypes.string.isRequired,
};

export default CoinCardContainer;
