import React from 'react';
import PropTypes from 'prop-types';

import SelectDropDown from '../SelectDropDown';
import CoinsTable from './CoinsTable';
import * as CoinsTableHelpers from './CoinsTableHelpers';

class CoinsTableContainer extends React.Component {
  state = {
    date: null,
    dates: [],
    columns: [],
    data: [],
    coins: [],
  };

  setDate(date) {
    CoinsTableHelpers.coinTableDataByDate(date)
    .then(({columns, data, coins}) => {
      this.setState({
        date: date,
        columns: columns,
        data: data,
        coins: coins,
      });
    });
  }

  componentDidMount() {
    CoinsTableHelpers.availableDates().then(_dates => {
      const dates = _dates.reverse();
      const date = dates[0];
      CoinsTableHelpers.coinTableDataByDate()
      .then(({columns, data, coins}) => {
        this.setState({
          dates: dates,
          date: date,
          columns: columns,
          data: data,
          coins: coins,
        });
      });
    });
  };

  render() {
    const props = this.props;
    const options = {};
    this.state.dates.forEach(date => {
      options[date] = date;
    });
    return (
      <div>
        <SelectDropDown
          label='Date'
          options={options}
          onSelect={this.setDate.bind(this)}
        />
        <CoinsTable
          coins={this.state.coins}
          columns={this.state.columns}
          data={this.state.data}
          {...props}
        />
      </div>
    );
  };
};

CoinsTableContainer.propTypes = {
  addCoinId: PropTypes.func.isRequired,
};

export default CoinsTableContainer;
