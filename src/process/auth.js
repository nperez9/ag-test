const axios = require('axios');

async function loginAgile() {
  const authToken = await axios.post(`${process.env.API_URL}/auth`, { apiKey: process.env.API_KEY });
  axios.defaults.headers.common = { Authorization: `Bearer ${authToken.data.token}` };
  return authToken.data.token;
}

module.exports = {
  loginAgile,
};
