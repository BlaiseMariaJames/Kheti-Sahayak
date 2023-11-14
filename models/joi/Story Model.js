// REQUIRING JOI AND OBJECT ID
let Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// ADD ESCAPE HTML EXTENSION TO JOI
const escapeHTMLExtension = require("../../utilities/security/JOI Escape HTML Extension");
Joi = Joi.extend(escapeHTMLExtension);

// DEFINING STORY SCHEMA
const storySchema = Joi.object({
    author: Joi.objectId().required(),
    title: Joi.string().required().escapeHTML(),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required().escapeHTML(),
        filename: Joi.string().required().escapeHTML()
    }).allow('')),
    description: Joi.string().required().escapeHTML(),
    location: Joi.string().allow('').escapeHTML(),
    likes: Joi.number().min(0),
});

// EXPORTING STORY SCHEMA
module.exports = storySchema;