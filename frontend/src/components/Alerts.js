import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Alert from '@material-ui/lab/Alert';

const Alerts = () => {
  const [alerts, updateNodeAlerts] = useState();

  const getNodesAlerts = async () => {
    const alerts = await axios.get('/api/smartcontrol/ubic/alerts');
    updateNodeAlerts(alerts.data.data);
  };

  useEffect(() => {
    getNodesAlerts();
  }, []);

  return (
    <>
      {!alerts ? (
        <Spinner />
      ) : (
        alerts.map((alert) => (
          <Alert severity='info' key={alert.id}>
            {alert.alertType}
          </Alert>
        ))
      )}
    </>
  );
};

export default Alerts;
