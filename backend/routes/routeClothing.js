const express = require('express');
const router = express.Router();

const clothingController = require('../controllers/clothing');
const brandingController = require('../controllers/branding');
const categoryController = require('../controllers/category');

router.get('/', clothingController.getClothing);
router.get('/product/:id', clothingController.getClothingByID);
router.get('/image/:name', clothingController.getClothingImageByName);

router.get('/branding', brandingController.getBranding);

router.get('/category', categoryController.getCategory);

module.exports = router;