// REQUIRING MONGOOSE AND OBJECT ID
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// STORING SCHEMA OBJECT INTO A VARIABLE
const Schema = mongoose.Schema;

// DEFINING COMMENT SCHEMA
const CommentSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: [true, "The field 'author' is mandatory"]
    },
    body: {
        type: String,
        required: [true, "The body of a comment cannot be empty"]
    }
});

// DEFINING COMMENT MODEL
const Comment = mongoose.model('Comment', CommentSchema);

// EXPORTING COMMENT MODEL
module.exports = Comment;