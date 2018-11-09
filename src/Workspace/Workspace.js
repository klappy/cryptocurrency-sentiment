import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import CoinCards from '../CoinCards';
import CoinsTable from '../CoinsTable';

export const Workspace = ({classes, coins, coinIds, addCoinId, removeCoinId}) => {
  let component = <CoinsTable addCoinId={addCoinId} />;
  if (coinIds.length > 0) {
    component = <CoinCards coinIds={coinIds} removeCoinId={removeCoinId} />
  }
  return component;
}


Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  coinIds: PropTypes.array.isRequired,
  addCoinId: PropTypes.func.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
  },
});

export default withStyles(styles)(Workspace);
