const router = require('express').Router();
const { getImages } = require('../services/image.service');

router.get('/', async (req, res) => {
  const searchTerm = req.query;
  try {
    const images = await getImages(searchTerm);
    if (!images.length) {
      return res.status(204).json([]);
    }
    return res.json(images);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mesage: 'Error searching images' });
  }
});

module.exports = router;
