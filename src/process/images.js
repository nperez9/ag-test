const axios = require('axios');
async function getImagesUrls(token) {
  const intialPage = 1;
  const imagesPromise = [];
  const { pictures, pageCount } = await getImagePage(intialPage, token);

  for (let i = 2; i < pageCount; i++) {
    imagesPromise.push(
      getImagePage(i, token).then((imageList) => {
        return imageList.pictures;
      }),
    );
  }
  return Promise.all(imagesPromise).then((images) => {
    const formattedImages = [];
    formattedImages.push(...pictures);
    images.forEach((image) => {
      formattedImages.push(...image);
    });
    return formattedImages;
  });
}

async function getImagePage(pageNumber, token) {
  return axios
    .get(`${process.env.API_URL}/images?page=${pageNumber}`, { headers: { Autorization: `Bearer ${token}` } })
    .then((response) => response.data)
    .catch((e) => console.error(`Error in the ${pageNumber} page`, e));
}

async function getDetailFromList(token, lists) {
  const imagesDetail = [];
  for (let i = 0; i < lists.length; i++) {
    const image = lists[i];
    imagesDetail.push(
      axios
        .get(`${process.env.API_URL}/images/${image.id}`, { headers: { Autorization: `Bearer ${token}` } })
        .then((imagesData) => imagesData.data)
        .catch((e) => console.error(`Error fetching the ${image.id} image`, e)),
    );
  }
  return Promise.all(imagesDetail);
}

module.exports = {
  getImagesUrls,
  getDetailFromList,
};
