import axios from 'axios';

const getSmartControlData = async (req, res) => {
  const config = {
    url: 'https://api.ubicquia.com/api/v2/nodes/light',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${req.user}`,
      'Content-Type': 'application/json',
    },
    filter: [
      {
        attribute: '',
        operator: '',
        value: '',
        start_date: '',
        end_date: '',
      },
    ],
  };

  try {
    const nodeData = await axios(config);
    if (!nodeData) {
      res.status(500).json({ message: 'no data available' });
    }

    res.json(nodeData.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const getAlerts = async (req, res) => {
  const config = {
    url: 'https://api.ubicquia.com/api/alerts?page=1&per_page=15',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.user}`,
    },
  };
  try {
    const alerts = await axios(config);

    if (!alerts) {
      res.status(500).json({ message: 'no data available' });
    }

    res.json(alerts.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export { getSmartControlData, getAlerts };
