// REQUIRING STORY MODEL AND OBJECT ID
const Story = require("../../models/Mongoose Models/Story Model.js");
const ObjectID = require("mongoose").Types.ObjectId;

// REQUIRING APPLICATION ERROR HANDLER CLASS 
const ApplicationError = require("../Error Handling/Application Error Handler Class.js");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../Error Handling/Async Error Handling Middleware Function.js");

// REQUIRING FUNCTION TO DELETE STORY IMAGES FROM CLOUDINARY (IF IN CASE OF ANY ERROR WHILE UPLOADING)
const deletestoryImages = require("../Cloudinary/Delete Cloudinary Images.js");

// DEFINING MIDDLEWARE FUNCTION TO CHECK IF STORY ID IS VALID, STORY EXISTS AND CURRENT USER IS AUTHORIZED TO EDIT OR DELETE THAT STORY
const isAuthorized = handleAsyncErrors(async (request, response, next) => {
    const id = request.params.id || request.body.id;
    if (!ObjectID.isValid(id)) {
        // ERROR HANDLED : Story not found due to invalid Story ID. 
        if (request.files) {
            // delete uploaded cloudinary images.
            deletestoryImages(request.files);
        }
        return next(new ApplicationError("Sorry!, Invalid Story ID. We couldn't find the story!", 'Invalid Story ID', 400));
    }
    const story = await Story.findById(id).populate('author');
    if (!story) {
        // ERROR HANDLED : Story not found.
        if (request.files) {
            // delete uploaded cloudinary images.
            deletestoryImages(request.files);
        }
        return next(new ApplicationError("Sorry!, We couldn't find the story!", 'Story Not Found', 404));
    }
    if (!story.author.equals(request.user._id)) {
        // USER IS NOT AUTHORIZED
        if (request.files) {
            // delete uploaded cloudinary images.
            deletestoryImages(request.files);
        }
        request.flash('error', 'You do not own this Story!');
        return response.redirect(`/stories/${id}`);
    }
    next();
});

module.exports = isAuthorized;