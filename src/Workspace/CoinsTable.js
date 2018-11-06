import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";

export const CoinTable = ({classes, coins}) => {
  const columnData = {
    coingecko_rank: 'CoinGecko Rank',
    symbol: 'Symbol',
    name: 'Name',
    market_cap_rank: 'Market Cap Rank',
  };
  const columns = Object.keys(columnData).map(columnKey => columnData[columnKey]);
  const data = coins.map((coin, index) =>
    Object.keys(columnData).map(columnKey => {
      let value = '';
      if (coin[columnKey]) value = coin[columnKey];
      if (columnKey === 'coingecko_rank') value = index + 1;
      return  value;
    })
  );
  const options = {
    filterType: "dropdown",
    filter: false,
    responsive: "scroll"
  };

  return (
    <MUIDataTable
      className={classes.root}
      title={"Coins"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

CoinTable.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
});

export default withStyles(styles)(CoinTable);
