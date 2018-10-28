import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
} from '@material-ui/icons';

export const Coin = ({classes, rank, coinObject, addCoinId, removeCoinId, selected}) => {
  const primaryText = rank + '. ' + coinObject.symbol.toUpperCase() + ' - ' + coinObject.name;
  const secondaryText = Number(coinObject.market_data.price_change_percentage_24h).toFixed(2) + '%'
  const onClick = selected ?
    () => removeCoinId(coinObject.id) :
    () => addCoinId(coinObject.id);
  return (
    <ListItem
      button
      selected={selected}
      className={classes.coinList}
      onClick={() => onClick()}
    >
      <Avatar
        className={classes.listItemIcon}
        src={coinObject.image ? coinObject.image.large : ''}
        classes={{img: classes.img}}
      />
      <ListItemText
        className={classes.listItemText}
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  );
};

Coin.propTypes = {
  classes: PropTypes.object.isRequired,
  coinObject: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  addCoinId: PropTypes.func.isRequired,
  removeCoinId: PropTypes.func.isRequired,
}

const styles = theme => ({
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  coinList: {
    paddingLeft: 1 + 'em',
    paddingRight: '0.7em',
  },
  listItemIcon: {
    marginRight: 0,
    borderRadius: 0,
  },
  listItemText: {
    paddingLeft: '0.7em',
  },
  img: {
    objectFit: 'contain',
  },
});

export default withStyles(styles)(Coin);
