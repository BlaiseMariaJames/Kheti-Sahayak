// REQUIRING MONGOOSE, OBJECT ID AND CLOUDINARY
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { cloudinary } = require("../../utilities/Cloudinary/Cloudinary Configuration");

// STORING SCHEMA OBJECT INTO A VARIABLE
const Schema = mongoose.Schema;

// REQUIRING MODELS ASSOCIATED WITH STORY
const Comment = require("./Comment Model");

// DEFINING IMAGE SCHEMA
const ImageSchema = new Schema({
    _id: { _id: false },
    url: {
        type: String,
        required: [true, "The field 'image url' is mandatory"]
    },
    filename: {
        type: String,
        required: [true, "The field 'image filename' is mandatory"]
    }
});

// DEFINING VIRTUAL FUNCTION TO SET VIRTUAL PROPERTY 'THUMBNAIL' FOR AN IMAGE
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300,h_300');
});

// DEFINING VIRTUAL FUNCTION TO SET VIRTUAL PROPERTY 'CARDIMAGE' FOR AN IMAGE
ImageSchema.virtual('cardImage').get(function () {
    return this.url.replace('/upload', '/upload/w_500,h_500');
});

// DEFINING STORY SCHEMA
const storySchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: [true, "The field 'author' is mandatory"]
    },
    title: {
        type: String,
        required: [true, "The field 'title' is mandatory"]
    },
    images: [ImageSchema],
    description: {
        type: String,
        required: [true, "The field 'description' is mandatory"]
    },
    location: {
        type: String
    },
    likes: {
        type: String,
        validate: {
            validator: function (likes) {
                return /^\d+$/.test(likes);
            },
            message: "Likes of the story has to be a number with a minimum value of 0"
        }
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            // A story may or may not have any comments.
            required: false
        }
    ]
});

// DEFINING STORY-MIDDLEWARE-FUNCTION AFTER DELETING A STORY
storySchema.post('findOneAndDelete', async function (story) {
    // Check for comments associated to Story.
    if (story.comments.length > 0) {
        // Delete all comments associated to Story.
        await Comment.deleteMany({
            // Delete every comment, whose id belongs to Story.  
            _id: { $in: story.comments }
        });
    }
    // Check for images associated to Story.
    if (story.images.length > 0) {
        // Delete all images associated to Story.
        for (let file of story.images) {
            // Delete every image, whose id belongs to Story. 
            cloudinary.uploader.destroy(file.filename);
        }
    }
    // Continue the same procedure for rest of the associated models.
});

// DEFINING STORY MODEL
const Story = mongoose.model('Story', storySchema);

// EXPORTING STORY MODEL
module.exports = Story;