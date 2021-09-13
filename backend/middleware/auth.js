import axios from 'axios';

import qs from 'qs';

const getToken = async (req, res, next) => {
  const config = {
    url: 'https://auth.ubihub.ubicquia.com/auth/realms/ubivu-prd/protocol/openid-connect/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      grant_type: 'password',
      username: process.env.CLIENT_USERNAME,
      password: process.env.PASSWORD,

      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  };

  try {
    const token = await axios(config);
    req.user = token.data.access_token;
    next();
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
};

export { getToken };
