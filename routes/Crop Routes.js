// REQUIRING EXPRESS AND CLOUDINARY STORAGE
const express = require("express");
// const { storage } = require("../utilities/Cloudinary/Cloudinary Configuration.js");

// MULTER CONFIGURATION
// const multer = require("multer");
// const upload = multer({ storage });

// CREATING ROUTER INSTANCE
const router = express.Router();

// REQUIRING CROP CONTROLLER
const Crop = require("../controllers/Crop Controller");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
// const handleAsyncErrors = require("../utilities/Error Handling/Async Error Handling Middleware Function.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF USER IS LOGGED IN 
// const isLoggedIn = require("../utilities/Authentication/Check If Logged In.js");

// RESPONDING TO THE SERVER AT CROP MODEL BASED ROUTE
router.get('/crop-recommendation', Crop.renderCropRecommendationForm);
router.get('/fertilizer-recommendation', Crop.renderFertilizerRecommendationForm);
router.get('/plant-disease-detection', Crop.renderPlantDiseaseDetectionForm);

// EXPORTING ROUTER INSTANCE
module.exports = router;