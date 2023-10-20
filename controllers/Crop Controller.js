// Crop Recommendation --> Recommend crops.
module.exports.renderCropRecommendationForm = (request, response, next) => {
    response.render('crops/Crop Recommendation', { title: "Kheti Sahayak | Crop Recommendation" });
}

// Fertilizer Recommendation --> Recommend fertilizers.
module.exports.renderFertilizerRecommendationForm = (request, response, next) => {
    response.render('crops/Fertilizer Recommendation', { title: "Kheti Sahayak | Fertilizer Recommendation" });
}

// Plant Disease Detection --> Detect plant diseases.
module.exports.renderPlantDiseaseDetectionForm = (request, response, next) => {
    response.render('crops/Plant Disease Detection', { title: "Kheti Sahayak | Plant Disease Detection" });
}