// REQUIRING JOI AND OBJECT ID
let Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// ADD ESCAPE HTML EXTENSION TO JOI
const escapeHTMLExtension = require("../../utilities/security/JOI Escape HTML Extension");
Joi = Joi.extend(escapeHTMLExtension);

// DEFINING CROP RECOMMENDATION SCHEMA
const cropRecommendationSchema = Joi.object({
    nitrogen: Joi.number().min(0).max(200).required(),
    phosphorous: Joi.number().min(0).max(200).required(),
    pottasium: Joi.number().min(0).max(200).required(),
    ph: Joi.number().min(0).max(14).required(),
    rainfall: Joi.number().min(0).max(300).required(),
    state: Joi.string().required().escapeHTML(),
    district: Joi.string().required().escapeHTML()
});

// DEFINING FERTILIZER RECOMMENDATION SCHEMA
const fertilizerRecommendationSchema = Joi.object({
    nitrogen: Joi.number().min(0).max(200).required(),
    phosphorous: Joi.number().min(0).max(200).required(),
    pottasium: Joi.number().min(0).max(200).required(),
    crop: Joi.string().required().escapeHTML()
});

// EXPORTING SCHEMAS
module.exports = { cropRecommendationSchema, fertilizerRecommendationSchema };