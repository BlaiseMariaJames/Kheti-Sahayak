// REQUIRING FILE SYSTEM AND EXPRESS
const fileSystem = require("fs");
const express = require("express");

// MULTER AND STORAGE CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        const path = "./public/temp";
        if (!fileSystem.existsSync(path)) {
            fileSystem.mkdirSync(path);
        }
        callback(null, "public/temp");
    },
    filename: function (request, file, callback) {
        const fileExtension = file.originalname.split(".").pop().toLowerCase();
        let customFilename = "download" + `.${fileExtension}`;
        callback(null, customFilename);
    }
});
const upload = multer({ storage });

// CREATING ROUTER INSTANCE
const router = express.Router();

// REQUIRING CROP CONTROLLER
const Crop = require("../controllers/Crop Controller");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../utilities/error handling/Async Error Handling Middleware Function.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF USER IS LOGGED IN 
const isLoggedIn = require("../utilities/authentication/Check If Logged In.js");

// RESPONDING TO THE SERVER AT CROP MODEL BASED ROUTE

router.route('/crop-recommendation')
    .get(isLoggedIn, Crop.renderCropRecommendationForm)
    .post(isLoggedIn, handleAsyncErrors(Crop.recommendCrop));

router.route('/fertilizer-recommendation')
    .get(isLoggedIn, Crop.renderFertilizerRecommendationForm)
    .post(isLoggedIn, handleAsyncErrors(Crop.recommendFertilizer));

router.route('/plant-disease-detection')
    .get(isLoggedIn, Crop.renderPlantDiseaseDetectionForm)
    .post(isLoggedIn, upload.single('crop[image]'), handleAsyncErrors(Crop.detectDisease));

// EXPORTING ROUTER INSTANCE
module.exports = router;