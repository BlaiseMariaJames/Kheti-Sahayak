// REQUIRING PATH AND FILE SYSTEM
const path = require('path');
const fileSystem = require("fs").promises;

// DEFINING FUNCTION TO DELETE THE TEMPORARY FOLDER AND ITS CONTENTS
const deleteTemporaryFolder = async (file) => {
    // EXTRACT DESTINATION PATH FROM THE FILE OBJECT
    const { destination } = file;

    // READ THE CONTENTS OF THE DESTINATION FOLDER
    const files = await fileSystem.readdir(destination);

    // DELETE EACH FILE IN THE FOLDER ASYNCHRONOUSLY
    await Promise.all(files.map(async (fileName) => {
        const filePath = path.join(destination, fileName);
        await fileSystem.unlink(filePath);
    }));

    // REMOVE THE EMPTY FOLDER AFTER DELETING ITS CONTENTS
    await fileSystem.rmdir(destination);
}

module.exports = deleteTemporaryFolder;