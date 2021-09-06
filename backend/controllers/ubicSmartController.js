import axios from 'axios';

const getSmartControlData = async (req, res) => {
  const config = {
    url: 'https://api.ubicquia.com/api/v2/nodes/light',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
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

export { getSmartControlData };
