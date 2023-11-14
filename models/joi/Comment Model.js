// REQUIRING JOI AND OBJECT ID
let Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// ADD ESCAPE HTML EXTENSION TO JOI
const escapeHTMLExtension = require("../../utilities/security/JOI Escape HTML Extension");
Joi = Joi.extend(escapeHTMLExtension);

// DEFINING COMMENT SCHEMA
const CommentSchema = Joi.object({
    author: Joi.objectId().required(),
    body: Joi.string().required().label("comment").escapeHTML()
});

// EXPORTING COMMENT SCHEMA
module.exports = CommentSchema;