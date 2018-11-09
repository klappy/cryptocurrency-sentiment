import React from 'react';
import PropTypes from 'prop-types';

import coinsArray from '../data/api/v1/array.json';

import CoinsTable from './CoinsTable';

class CoinsTableContainer extends React.Component {
  state = {
  };

  componentDidMount() {
  };

  render() {
    const props = this.props;
    return (
      <CoinsTable
        coins={coinsArray}
        {...props}
      />
    );
  };
};

CoinsTableContainer.propTypes = {
  addCoinId: PropTypes.func.isRequired,
};

export default CoinsTableContainer;
