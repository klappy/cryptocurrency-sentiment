import React from 'react';
import PropTypes from 'prop-types';

import Workspace from './Workspace';
import './workspace.css';

class WorkspaceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
  coinIds: PropTypes.array.isRequired,
};

export default WorkspaceContainer;
