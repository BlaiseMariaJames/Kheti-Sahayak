// REQUIRING PATH AND FILE SYSTEM
const path = require('path');
const fileSystem = require("fs").promises;

// REQUIRING CROP SCHEMAS
const cropSchemas = require("../models/joi/Crop Models.js");

// REQUIRE API KEY AND JAVASCRIPT-PYTHON CONNECTOR FUNCTION
const { OPEN_WEATHER_API_KEY } = process.env;
const connect = require("../utilities/others/Connect Javascript to Python.js");

// REQUIRING APPLICATION ERROR HANDLER CLASS 
const ApplicationError = require("../utilities/error handling/Application Error Handler Class.js");

// Crop Recommendation Form --> Form to recommend crops.
module.exports.renderCropRecommendationForm = (request, response, next) => {
    response.render('crops/Crop Recommendation', { title: "Kheti Sahayak | Crop Recommendation" });
}

// Crop Recommendation --> Recommend crops.
module.exports.recommendCrop = async (request, response, next) => {
    const { cropRecommendationSchema } = cropSchemas;
    let { crop_recommend } = request.body;
    const { error } = cropRecommendationSchema.validate(crop_recommend);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        request.flash('error', `Cannot recommend crop, ${errorMessage}.`);
        response.status(400).redirect('/crops/crop-recommendation');
    } else {
        let { district } = crop_recommend;
        crop_recommend.city = district.split(" ")[0];
        crop_recommend.api_key = OPEN_WEATHER_API_KEY;
        try {
            const recommendation = await connect(crop_recommend, 1);
            const { result } = recommendation;
            if (result) {
                const imageUrl = `https://res.cloudinary.com/dtwgxcqkr/image/upload/v1706242805/Kheti%20Sahayak%20Related%20Media/crops/${recommendation.result}`;
                return response.render('crops/Recommend Crop', { title: "Kheti Sahayak | Crop Recommendation", recommendation, imageUrl });
            }
            request.flash('error', `Sorry, we couldn't recommend crop for your location!`);
            response.status(400).redirect('/crops/crop-recommendation');
        } catch (error) {
            return next(new ApplicationError(error, "Python Server Error"));
        }
    }
}

// Fertilizer Recommendation Form --> Form to recommend fertilizers.
module.exports.renderFertilizerRecommendationForm = (request, response, next) => {
    response.render('crops/Fertilizer Recommendation', { title: "Kheti Sahayak | Fertilizer Recommendation" });
}

// Fertilizer Recommendation --> Recommend fertilizers.
module.exports.recommendFertilizer = async (request, response, next) => {
    const { fertilizerRecommendationSchema } = cropSchemas;
    const { fertilizer_recommend } = request.body;
    const { error } = fertilizerRecommendationSchema.validate(fertilizer_recommend);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        request.flash('error', `Cannot recommend fertilizer, ${errorMessage}.`);
        response.status(400).redirect('/crops/fertilizer-recommendation');
    } else {
        try {
            const recommendation = await connect(fertilizer_recommend, 2);
            response.send(`Fertilizer Recommended for ${JSON.stringify(recommendation)}`);
        } catch (error) {
            return next(new ApplicationError(error, "Python Server Error"));
        }
    }
}

// Plant Disease Detection Form --> Form to detect plant diseases.
module.exports.renderPlantDiseaseDetectionForm = (request, response, next) => {
    response.render('crops/Plant Disease Detection', { title: "Kheti Sahayak | Plant Disease Detection" });
}

// Plant Detection --> Detect plant disease.
module.exports.detectDisease = async (request, response, next) => {
    const file = request.file;
    if (!file) {
        request.flash('error', `Cannot detect disease, photo required.`);
        response.status(400).redirect('/crops/plant-disease-detection');
    } else {
        try {
            const detection = await connect(file, 3);
            const { destination } = file;
            const files = await fileSystem.readdir(destination);
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(destination, file);
                await fileSystem.unlink(filePath);
            }));
            await fileSystem.rmdir(destination);
            response.send(`Disease Detected for ${JSON.stringify(detection)}`);
        } catch (error) {
            return next(new ApplicationError(error, "Python Server Error"));
        }
    }
}