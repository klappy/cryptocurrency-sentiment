import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './Application.css';

import ApplicationBar from './ApplicationBar';
import Workspace from './Workspace';

export const Application = ({classes, coinIds, addCoinId, removeCoinId}) =>
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <ApplicationBar
        coinIds={coinIds}
        addCoinId={addCoinId}
        removeCoinId={removeCoinId}
      />
      <main className={classes.main}>
        <Workspace
          coinIds={coinIds}
          removeCoinId={removeCoinId}
        />
      </main>
    </div>
  </div>

Application.propTypes = {
  classes: PropTypes.object.isRequired,
  coinIds: PropTypes.array.isRequired,
  addCoinId: PropTypes.func.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  main: {
    padding: '5em 1em 1em 1em',
    minWidth: '20em',
    fontSize: '0.9em',
    lineHeight: '1.75em',
  }
});

export default withStyles(styles)(Application);
