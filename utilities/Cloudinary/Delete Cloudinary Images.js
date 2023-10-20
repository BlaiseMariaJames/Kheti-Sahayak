// REQUIRING CLOUDINARY
const { cloudinary } = require("./Cloudinary Configuration");

// FUNCTION TO DELETE STORY IMAGES FROM CLOUDINARY (IF IN CASE OF ANY ERROR WHILE UPLOADING)
const deletestoryImages = (storyImages) => {
    // Deleting images.
    for (let file of storyImages) {
        cloudinary.uploader.destroy(file.filename);
    }
};

module.exports = deletestoryImages;