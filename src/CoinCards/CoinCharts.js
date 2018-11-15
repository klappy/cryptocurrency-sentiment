import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Line} from 'react-chartjs-2';

import SelectDropDown from '../SelectDropDown';

import * as CoinCardsHelpers from './CoinCardsHelpers';

class CoinCharts extends React.Component {
  state = {
    scale: 'days',
    datasetsCharts: {},
  };

  componentDidMount() {
    this.setDataSetsCharts(this.state.scale);
  };

  setScale(scale) {
    this.setDataSetsCharts(scale);
  };

  setDataSetsCharts(scale) {
    let _this = this;
    let {id} = this.props.coinObject;
    CoinCardsHelpers.datasetsCharts(id, scale)
    .then(datasetsCharts => {
      _this.setState({
        scale,
        datasetsCharts: datasetsCharts,
      });
    });
  }

  render() {
    const { classes } = this.props;

    const charts = Object.keys(this.state.datasetsCharts)
    .map(chartKey => {
      return {
        chartKey: chartKey,
        labels: CoinCardsHelpers.backDays(this.state.scale).map(days => days + 'd'),
        datasets: this.state.datasetsCharts[chartKey],
      };
    }).map(dataChart =>
      <Line key={dataChart.chartKey} data={dataChart} />
    );

    const options = {
      fibonacci: 'Fibonacci',
      days: 'Days',
      weeks: 'Weeks',
      months: 'Months',
    };

    return (
      <div>
        <SelectDropDown
          label='Scale'
          options={options}
          onSelect={this.setScale.bind(this)}
        />
        {charts}
      </div>
    );
  }
}

CoinCharts.propTypes = {
  classes: PropTypes.object.isRequired,
  coinObject: PropTypes.object.isRequired,
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export default withStyles(styles)(CoinCharts);
