import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Line} from 'react-chartjs-2';

import * as helpers from './helpers';

class CoinCharts extends React.Component {
  state = {
    open: false,
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
    helpers.datasetsCharts(id, scale)
    .then(datasetsCharts => {
      _this.setState({
        scale,
        datasetsCharts: datasetsCharts,
      });
    });
  }

  handleChange = event => {
    // this.setState({ [event.target.name]: event.target.value });
    this.setScale(event.target.value);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    const charts = Object.keys(this.state.datasetsCharts)
    .map(chartKey => {
      return {
        chartKey: chartKey,
        labels: helpers.backDays(this.state.scale).map(days => days + 'd'),
        datasets: this.state.datasetsCharts[chartKey],
      };
    }).map(dataChart =>
      <Line key={dataChart.chartKey} data={dataChart} />
    );

    return (
      <div>
        <form autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="scale-controlled-open-select">
              Scale
            </InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.scale}
              onChange={this.handleChange}
              inputProps={{
                name: 'scale',
                id: 'scale-controlled-open-select',
              }}
            >
              <MenuItem value='fibonacci'>Fibonacci</MenuItem>
              <MenuItem value='days'>Days</MenuItem>
              <MenuItem value='weeks'>Weeks</MenuItem>
              <MenuItem value='months'>Months</MenuItem>
            </Select>
          </FormControl>
        </form>
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
