// REQUIRING EXPRESS AND CLOUDINARY STORAGE
const express = require("express");

// CREATING ROUTER INSTANCE
const router = express.Router();

// REQUIRING CROP CONTROLLER
const Crop = require("../controllers/Crop Controller");

// RESPONDING TO THE SERVER AT CROP MODEL BASED ROUTE
router.get('/crop-recommendation', Crop.renderCropRecommendationForm);
router.get('/fertilizer-recommendation', Crop.renderFertilizerRecommendationForm);
router.get('/plant-disease-detection', Crop.renderPlantDiseaseDetectionForm);

// EXPORTING ROUTER INSTANCE
module.exports = router;