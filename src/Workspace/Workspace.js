import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import CoinCards from '../CoinCards';

export const Workspace = ({classes, coins, coinIds, removeCoinId}) =>
  <CoinCards coinIds={coinIds} removeCoinId={removeCoinId} />


Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  coinIds: PropTypes.array.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
  },
});

export default withStyles(styles)(Workspace);
