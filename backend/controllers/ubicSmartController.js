import axios from 'axios';

//Desc: Gets the list of nodes
//Type: POST ubic/
//Authenticated User Only

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
    if (!nodeData.data.data) {
      res.status(500).json({ message: 'no data available' });
    }

    res.json(nodeData.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//Desc: Gets the alerts
//Type: GET ubic/alerts
//Authenticated User Only

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

    if (!alerts.data.data) {
      res.status(500).json({ message: 'no data available' });
    }

    res.json(alerts.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//Desc: Turn ON or OFF the light.
//Type: POST /ubic/setlight
//Authenticated User Only

const toggleLight = async (req, res) => {
  const config = {
    url: 'https://api.ubicquia.com/api/nodes/setLightState',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${req.user}`,
      'Content-Type': 'application/json',
    },
    data: {
      id_list: [
        {
          id: 8,
          //this will need to be passed from the front end only.
        },
      ],
      value: 0,
      node_level_type_id: 1,
    },
  };

  try {
    const lightStatus = await axios(config);
    res.status(200).json(lightStatus.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export { getSmartControlData, getAlerts, toggleLight };
