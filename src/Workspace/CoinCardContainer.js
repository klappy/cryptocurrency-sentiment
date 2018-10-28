import React from 'react';
import PropTypes from 'prop-types';

import CoinCard from './CoinCard';
import * as helpers from '../helpers/CoinGeckoHelpers';
import './workspace.css';

class CoinCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinObject: null
    }
  };

  componentDidMount() {
    const {coinId} = this.props;
    if (coinId) {
      helpers.coin(coinId)
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
    const coinCard = <CoinCard {...props} coinObject={coinObject} />;
    const component = this.state.coinObject ? coinCard : <div />
    return component;
  };
};

CoinCardContainer.propTypes = {
  coinId: PropTypes.string.isRequired,
};

export default CoinCardContainer;
