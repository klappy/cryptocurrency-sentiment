import React from 'react';
import PropTypes from 'prop-types';

import Workspace from './Workspace';

class WorkspaceContainer extends React.Component {
  state = {

  };

  componentDidMount() {
  };

  render() {
    const props = this.props;
    return (
      <Workspace
        {...props}
      />
    );
  };
};

WorkspaceContainer.propTypes = {
  coins: PropTypes.array.isRequired,
  coinIds: PropTypes.array.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

export default WorkspaceContainer;
