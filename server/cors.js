const axios = require('axios');

export default function (req, res) {
  axios.defaults.baseURL = 'https://hades.gamepedia.com';
  axios.defaults.headers.common.Referer = 'https://hades.gamepedia.com/';
  axios.defaults.headers.common.Origin = 'https://hades.gamepedia.com/';
  axios
    .get(req.url)
    .then((response) => {
      res.setHeader('Content-Type', 'text/html');
      res.end(response.data);
    })
    .catch(() => {
      res.statusCode = 500;
      res.statusMessage = 'Failed to request hades';
      res.end();
    });
}
