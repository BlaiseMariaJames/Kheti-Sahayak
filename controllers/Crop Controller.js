// REQUIRING PATH AND FILE SYSTEM
const path = require('path');
const fileSystem = require("fs").promises;

// REQUIRING CROP SCHEMAS
const cropSchemas = require("../models/Joi Models/Crop Models.js");

// Crop Recommendation Form --> Form to recommend crops.
module.exports.renderCropRecommendationForm = (request, response, next) => {
    response.render('crops/Crop Recommendation', { title: "Kheti Sahayak | Crop Recommendation" });
}

// Crop Recommendation --> Recommend crops.
module.exports.recommendCrop = (request, response, next) => {
    const { cropRecommendationSchema } = cropSchemas;
    const { crop_recommend } = request.body;
    const { error } = cropRecommendationSchema.validate(crop_recommend);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        request.flash('error', `Cannot recommend crop, ${errorMessage}.`);
        response.status(400).redirect('/crops/crop-recommendation');
    } else {
        response.send(`Crop Recommended for ${JSON.stringify(crop_recommend)}`);
    }
}

// Fertilizer Recommendation Form --> Form to recommend fertilizers.
module.exports.renderFertilizerRecommendationForm = (request, response, next) => {
    response.render('crops/Fertilizer Recommendation', { title: "Kheti Sahayak | Fertilizer Recommendation" });
}

// Fertilizer Recommendation --> Recommend fertilizers.
module.exports.recommendFertilizer = (request, response, next) => {
    const { fertilizerRecommendationSchema } = cropSchemas;
    const { fertilizer_recommend } = request.body;
    const { error } = fertilizerRecommendationSchema.validate(fertilizer_recommend);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        request.flash('error', `Cannot recommend fertilizer, ${errorMessage}.`);
        response.status(400).redirect('/crops/fertilizer-recommendation');
    } else {
        response.send(`Fertilizer Recommended for ${JSON.stringify(fertilizer_recommend)}`);
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
        const { destination } = file;
        const files = await fileSystem.readdir(destination);
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(destination, file);
            await fileSystem.unlink(filePath);
        }));
        await fileSystem.rmdir(destination);
        response.send(`Disease Detected for ${JSON.stringify(file)}`);
    }
}