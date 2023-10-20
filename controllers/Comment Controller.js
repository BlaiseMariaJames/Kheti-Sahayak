// REQUIRING STORY MODEL
const Story = require("../models/Mongoose Models/Story Model.js");

// REQUIRING COMMENT MODEL AND SCHEMA
const Comment = require("../models/Mongoose Models/Comment Model.js");
const CommentSchema = require("../models/Joi Models/Comment Model.js");

// REQUIRING APPLICATION ERROR HANDLER CLASS 
const ApplicationError = require("../utilities/Error Handling/Application Error Handler Class.js");

// Create --> Creates new comment on server.
module.exports.createComment = async (request, response, next) => {
    let { storyId } = request.params;
    let { comment } = request.body;
    comment.author = request.user._id.toString();
    const { error } = CommentSchema.validate(comment);
    const story = await Story.findById(storyId).populate('comments');
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        // Below two lines of code will redirect to the same page and make user aware of errors.
        request.flash('error', `Cannot create comment, ${errorMessage}.`);
        response.status(400).redirect(`/stories#${storyId}`);
        // Use below code to redirect to Error Page and make user aware of errors.
        // return next(new ApplicationError(errorMessage, "Bad Request", 400));
    } else {
        comment.body = comment.body.replace(/[\r\n\t]/gm, ' ');
        const newComment = new Comment(comment);
        await newComment.save();
        story.comments.push(newComment);
        await story.save();
        request.flash('success', 'Successfully created a new Comment!');
        response.redirect(`/stories#${storyId}`);
    }
}

// Delete --> Deletes a comment on server.
module.exports.deleteComment = async (request, response, next) => {
    const { storyId, commentId } = request.params;
    await Story.findByIdAndUpdate(storyId, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId)
        .then(() => {
            request.flash('success', 'Successfully deleted the Comment!');
            response.redirect(`/stories#${storyId}`);
        })
        .catch((error) => {
            return next(new ApplicationError(error.message, error.name));
        });
}