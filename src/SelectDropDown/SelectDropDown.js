import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class CoinCharts extends React.Component {
  state = {
    open: false,
    selected: null,
  };

  handleChange = event => {
    const {value} = event.target;
    this.props.onSelect(value);
    this.setState({ selected: value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="controlled-open-select">
            {this.props.label}
          </InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selected}
            onChange={this.handleChange}
            inputProps={{
              name: this.props.label,
              id: 'controlled-open-select',
            }}
          >
            {
              Object.keys(this.props.options).map(key =>
                <MenuItem key={key} value={key}>{this.props.options[key]}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

CoinCharts.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export default withStyles(styles)(CoinCharts);
