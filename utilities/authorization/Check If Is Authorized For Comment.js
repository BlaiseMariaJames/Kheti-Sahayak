// REQUIRING COMMENT MODEL
const Comment = require("../../models/mongoose/Comment Model.js");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../error handling/Async Error Handling Middleware Function.js");

// DEFINING MIDDLEWARE FUNCTION TO CHECK IF CURRENT USER IS AUTHORIZED TO EDIT OR DELETE A COMMENT
const isAuthorized = handleAsyncErrors(async (request, response, next) => {
    const { storyId, commentId } = request.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(request.user._id)) {
        // USER IS NOT AUTHORIZED
        request.flash('error', 'You do not own this Comment!');
        return response.redirect(`/stories/${storyId}`);
    }
    next();
});

module.exports = isAuthorized; 