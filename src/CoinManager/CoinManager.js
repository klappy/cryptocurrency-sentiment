import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
} from '@material-ui/core';

import Coin from './Coin';

export const CoinManager = ({classes, coins, coinIds, addCoinId, removeCoinId}) =>
  <div className={classes.coins}>
    <List
      className={classes.coins}
      component="nav"
      dense
    >
      <div className={classes.coinList}>
        {
          coins.map((coinObject, index) =>
            <Coin
              key={coinObject.id}
              rank={index + 1}
              coinObject={coinObject}
              selected={coinIds.includes(coinObject.id)}
              addCoinId={addCoinId}
              removeCoinId={removeCoinId}
            />
          )
        }
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </List>
  </div>

CoinManager.propTypes = {
  coins: PropTypes.array.isRequired,
  coinIds: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  addCoinId: PropTypes.func.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  coins: {
    height: '100%',
  },
  coinList: {
    height: '100%',
    overflowY: 'auto',
  },
});

export default withStyles(styles)(CoinManager);
