const { loginAgile } = require('./auth');
const { getImagesUrls, getDetailFromList } = require('./images');
const { insertImages } = require('../services/image.service');

async function startApp() {
  try {
    console.info('fetching images......');
    const authToken = await loginAgile();
    const urls = await getImagesUrls(authToken);
    if (!urls.length) {
      throw new Error('Cant reach images from the endpoint');
    }
    const imagesData = await getDetailFromList(authToken, urls);
    const result = await insertImages(imagesData);
    console.info('fetching ends');
  } catch (e) {
    console.error('Errror Loading Images', e);
  }
}

module.exports = startApp;
