// REQUIRING OBJECT ID AND CLOUDINARY 
const ObjectID = require("mongoose").Types.ObjectId;
const { cloudinary } = require("../utilities/cloudinary/Cloudinary Configuration.js");

// REQUIRING STORY MODEL AND SCHEMA
const Story = require("../models/mongoose/Story Model.js");
const storySchema = require("../models/joi/Story Model.js");

// REQUIRING APPLICATION ERROR HANDLER CLASS 
const ApplicationError = require("../utilities/error handling/Application Error Handler Class.js");

// REQUIRING FUNCTION TO DELETE STORY IMAGES FROM CLOUDINARY (IF IN CASE OF ANY ERROR WHILE UPLOADING)
const deletestoryImages = require("../utilities/cloudinary/Delete Cloudinary Images.js");

// CREATE OPERATION ROUTES

// New --> Form to create a new story.
module.exports.renderNewForm = (request, response) => {
    response.render('stories/New', { title: "New Story" });
}

// Create --> Creates new story on server.
module.exports.createstory = async (request, response, next) => {
    let { story } = request.body;
    story.author = request.user._id.toString();
    story.images = request.files.map(file => ({ url: file.path, filename: file.filename }));
    const { error } = storySchema.validate(story);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        if (request.files) {
            // delete uploaded cloudinary images.
            deletestoryImages(request.files);
        }
        // Below two lines of code will redirect to the same page and make user aware of errors.
        request.flash('error', `Cannot create story, ${errorMessage}.`);
        response.status(400).redirect('stories/new');
        // Use below code to redirect to Error Page and make user aware of errors.
        // return next(new ApplicationError(errorMessage, "Bad Request", 400));
    } else {
        const newstory = new Story(story);
        await newstory.save();
        request.flash('success', 'Successfully created a new Story!');
        response.redirect(`/stories/${newstory._id}`);
    }
}

// READ OPERATION ROUTES

// Show --> Details for one specific story.
module.exports.showstory = async (request, response, next) => {
    const { id } = request.params;
    // ERROR HANDLED : Story not found due to invalid Story ID. 
    if (!ObjectID.isValid(id)) {
        return next(new ApplicationError("Sorry!, Invalid Story ID. We couldn't find the story!", 'Invalid Story ID', 400));
    }
    const story = await Story.findById(id).populate('author');
    if (!story) {
        // ERROR HANDLED : Story not found.
        return next(new ApplicationError("Sorry!, We couldn't find the story!", 'Story Not Found', 404));
    }
    response.render('stories/Show', { title: story.title, story });
}

// Index --> Display all stories.
module.exports.allStoriess = async (request, response, next) => {
    let errorMessage = "";
    let stories = await Story.find({}).populate({ path: 'comments', populate: { path: 'author' } }).populate('author');
    if (stories.length > 0) {
        response.render('stories/Index', { title: "All Stories", stories, errorMessage });
    } else {
        errorMessage = "No stories are currently available.";
        response.render('stories/Index', { title: "All Stories", stories, errorMessage });
    }
}

// UPDATE OPERATION ROUTES

// Edit --> Form to edit a story.
module.exports.renderEditForm = async (request, response) => {
    const { id } = request.params;
    const story = await Story.findById(id).populate('author');
    response.render('stories/Edit', { title: "Edit Story", story });
}

// Update --> Updates a story on server.
module.exports.updatestory = async (request, response, next) => {
    let { id, story } = request.body;
    const { error } = storySchema.validate(story);
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        // Below two lines of code will redirect to the same page and make user aware of errors.
        request.flash('error', `Cannot edit story, ${errorMessage}.`);
        response.status(400).redirect(`/stories/${id}/edit`);
        // Use below code to redirect to Error Page and make user aware of errors.
        // return next(new ApplicationError(errorMessage, "Bad Request", 400));
    } else {
        const newstory = await Story.findById(id);
        Object.assign(newstory, story);
        await newstory.save();
        request.flash('success', 'Successfully edited the Story!');
        response.redirect(`/stories/${newstory._id}`);
    }
}

// Manage --> Form to manage story images.
module.exports.renderManageForm = async (request, response) => {
    const { id } = request.params;
    const story = await Story.findById(id).populate('author');
    response.render('stories/Manage', { title: "Manage Story Images", story });
}

// Redesign --> Manages story images on server.
module.exports.redesignstory = async (request, response) => {
    let { id } = request.body;
    const oldstory = await Story.findById(id);
    // Pushing images.
    const storyImages = request.files.map(file => ({ url: file.path, filename: file.filename }));
    oldstory.images.push(...storyImages);
    await oldstory.save();
    // Deleting images.
    if (request.body.deletestoryImages) {
        for (let filename of request.body.deletestoryImages) {
            cloudinary.uploader.destroy(filename);
        }
        await oldstory.updateOne({ $pull: { images: { filename: { $in: request.body.deletestoryImages } } } });
    }
    request.flash('success', 'Successfully edited the Story!');
    response.redirect(`/stories/${oldstory._id}`);
}

// DELETE OPERATIONS ROUTES

// Remove --> Form to remove a story.
module.exports.renderRemoveForm = async (request, response) => {
    const { id } = request.params;
    const story = await Story.findById(id);
    response.render('stories/Remove', { title: "Remove Story", story });
}

// Delete --> Deletes a story on server.
module.exports.deletestory = async (request, response, next) => {
    const { id } = request.body;
    await Story.findByIdAndDelete(id)
        .then(() => {
            request.flash('success', 'Successfully deleted the Story!');
            response.redirect('/stories');
        })
        .catch((error) => {
            return next(new ApplicationError(error.message, error.name));
        });
}