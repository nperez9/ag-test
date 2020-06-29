const Loki = require('lokijs');
const db = new Loki('image.db');
const imagesCollection = db.addCollection('images');

async function insertImages(images) {
  return new Promise((resolve) => {
    resolve(imagesCollection.insert(images));
  });
}

async function getImages(searchTerm) {
  return new Promise((resolve) => {
    resolve(imagesCollection.find(searchTerm));
  });
}

async function removeImages() {
  return new Promise((resolve) => {
    resolve(imagesCollection.removeDataOnly());
  });
}

module.exports = {
  insertImages,
  getImages,
  removeImages,
};
