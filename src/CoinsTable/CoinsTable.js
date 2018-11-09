import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";

export const CoinTable = ({classes, coins, addCoinId}) => {
  let columnData = {
    coin: 'Symbol: Name',
    market_cap_rank: 'MarketCap',
    coingecko_score: 'CoinGecko',
    developer_score: 'Developer',
    community_score: 'Community',
    liquidity_score: 'Liquidity',
    public_interest_score: 'SearchEngine',
  };
  const columns = Object.keys(columnData).map(columnKey => columnData[columnKey]);
  const data = coins.map((coin, index) => {
    let coinData = Object.keys(columnData).map(columnKey => {
      let value = '';
      if (coin[columnKey]) value = coin[columnKey];
      if (columnKey === 'coingecko_rank') value = index + 1;
      if (columnKey === 'market_cap_rank') value = value || coins.length
      if (columnKey === 'coin')
        value = coin['coingecko_rank'] + '. ' + coin['symbol'].toUpperCase() + ': ' + coin['name'];
      return  value || 0;
    });
    return coinData;
  });
  const options = {
    filter: false,
    responsive: 'scroll',
    rowsPerPageOptions: [10,20,50,100],
    onRowClick: (rowData,rowMeta) => {
      const id = coins[rowMeta.dataIndex].id;
      addCoinId(id);
    },
  };
  columnData['coin'] = 'Coin';

  return (
    <MUIDataTable
      className={classes.root}
      title={"CoinGecko Scores"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

CoinTable.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  addCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
});

export default withStyles(styles)(CoinTable);
