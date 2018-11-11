import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";

export const CoinTable = ({classes, coins, columns, data, addCoinId}) => {
  const options = {
    filter: false,
    responsive: 'scroll',
    rowsPerPageOptions: [10,20,50,100],
    onRowClick: (rowData,rowMeta) => {
      const id = coins[rowMeta.dataIndex].id;
      addCoinId(id);
    },
  };

  return (
    <MUIDataTable
      className={classes.root}
      title={"CoinGecko Scores"}
      columns={columns}
      data={data}
      options={options}
    />
  );
};

CoinTable.propTypes = {
  classes: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  addCoinId: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
});

export default withStyles(styles)(CoinTable);
