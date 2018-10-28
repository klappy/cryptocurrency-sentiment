import React from 'react';
import ApplicationBar from './ApplicationBar';

const projectName = 'CoinGecko';

const ApplicationBarContainer = (props) =>
  <ApplicationBar
    {...props}
    projectName={projectName}
  />

export default ApplicationBarContainer;
