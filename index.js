const app = require('express')();
const dotenv = require('dotenv');
const startApp = require('./src/process');
const searchController = require('./src/controllers/search.controller');
const { removeImages } = require('./src/services/image.service');

dotenv.config();

async function init() {
  await startApp();
  app.listen(3000, () => console.info('Server listening at 3000'));
}
app.use('/search', searchController);
init();

setInterval(async () => {
  try {
    await removeImages();
    startApp();
  } catch (e) {
    console.error('error updating cache', e);
  }
}, process.env.CACHE_TTL);
