import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import CoinCardContainer from './CoinCardContainer';

export const CoinCards = ({classes, coinIds, removeCoinId}) =>
  coinIds.map(coinId =>
    <CoinCardContainer coinId={coinId} removeCoinId={removeCoinId} />
  )


CoinCards.propTypes = {
  coinIds: PropTypes.array.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
  },
});

export default withStyles(styles)(CoinCards);
