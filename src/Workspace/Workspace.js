import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import CoinCardContainer from './CoinCardContainer'

export const Workspace = ({classes, coinIds, removeCoinId}) => {
  let coinCards = <div />;
  if (coinIds.length > 0) {
    coinCards = coinIds.map(coinId =>
      <CoinCardContainer key={coinId} coinId={coinId} removeCoinId={removeCoinId}  />
    )
  }
  return coinCards;
}


Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
  coinIds: PropTypes.array.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
  },
});

export default withStyles(styles)(Workspace);
