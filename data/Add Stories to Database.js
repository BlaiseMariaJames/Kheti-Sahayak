// REQUIRING MONGOOSE, READLINE AND CLOUDINARY
const mongoose = require("mongoose");
const readline = require("readline-sync");
const { cloudinary } = require("../utilities/Cloudinary/Cloudinary Configuration.js");

// ACCESS .ENV VARIABLES IF NOT IN "PRODUCTION MODE" BY REQUIRING DOTENV
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// CONFIGURING CLOUDINARY WITH .ENV VARIABLES
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// REQUIRING USER, COMMENT AND STORY MODEL
const User = require("../models/Mongoose Models/User Model.js");
const Comment = require("../models/Mongoose Models/Comment Model.js");
const Story = require("../models/Mongoose Models/Story Model.js");

// REQUIRING DATA
const stories = require("./Stories.js");
const cities = require("./Cities.js");

// DEFINING FIND RANDOM FUNCTION
const findRandom = array => array[Math.floor(Math.random() * array.length)];

// DEFINING FUNCTION TO UPLOAD IMAGES STORED LOCALLY TO CLOUDINARY
const uploadSamplestoryImages = async () => {
    let images = [];
    for (let i = 1; i <= 5; i++) {
        await cloudinary.uploader.upload(`public/Media/Sample Images/sample_image_${i}.jpg`, {
            folder: "/Kheti Sahayak",
            resource_type: "image"
        }).then((result) => {
            images.push(result);
        }).catch((error) => {
            console.log("error", JSON.stringify(error, null, 2));
        });
    }
    images = images.map(image => ({ url: image.url, filename: image.public_id }));
    return images;
}

// DEFINING SEED DATA FUNCTION
async function seedData() {

    // STEP 1: DELETING EXISTING DATA //

    console.log("Deleting files, this may take a few seconds or several minutes...");
    // Delete all images inside Kheti Sahayak folder in cloudinary.
    console.log("\nDeleting existing cloudinary images...");
    try {
        await cloudinary.api.delete_resources_by_prefix('Kheti Sahayak/');
        // Delete Kheti Sahayak folder in cloudinary.
        await cloudinary.api.delete_folder("Kheti Sahayak/");
    } catch (error) {
        console.log("Couldn't delete images as your folder 'Kheti Sahayak' was accidently deleted from your cloudinary account (OR) doesn't exist yet!\n");
    }
    // Delete any existing story.
    console.log("Deleting existing stories...");
    await Story.deleteMany({});
    // Delete any existing user.
    console.log("Deleting existing users...");
    await User.deleteMany({});
    // Delete any existing comment.
    console.log("Deleting existing comments...");
    await Comment.deleteMany({});
    console.log("Existing data deleted successfully!");

    // STEP 2: CREATING DATA //

    // Create a new user account.
    console.log("\nCreating User with username 'Unknown' and password 'coltisgreat'...");
    const newUser = User({
        username: 'Unknown',
        email: 'Unknown@gmail.com',
        salt: 'b70e6a9f24b279d2097371b8d39657af041cdb48c5ff61ba5ba5775cdba33843',
        hash: '3067162b122490dfa8aaa3cb41a42e31c1e6be3f5853dc834570ba6fe8f4451b0dec026af486f3098b10517a0a96b14bce0063fb0799d1da5ae2364c0156096aae9df0ceecd76cf401cb7614dfe86e245860518ae7958f433a11e9ff5365fc89ef1f96bb144da388d69211ee42576710f285b4142f6a120cd2d93c1ef3c8e5476428533307226a90f3967c776d00404a443a3c96770c446fb4ec0833dbd68bb6cbd22a94044c85bf7e18781b895b831914116d160366f26fbc47d3e7c089b186768c543e6396951ae40b6e25f605432b40bbd771473f8277d05d3c70961af25f8d0e90e16d8cf70fda799ae1ce04f0fa329979a8b6e27ebef37cfdf109156f2336cb91b931a2d9ffb2101d8bed7e3ac0f42cacabf2dcfcced050295785be28e0eb3929a32e64a5d3fb2b25cfbbdb656a9da6caf6d5ad981ad2c135959f1fe2a3de0ed3899bb84417243b6424060ce853853d41e1250189566457ef1a79ebcbfa586db7ca2b77a10e586e5fdca84a39a712a763bc3922234b3a150a2c7563e4b91d78977ef73250d0c5b81e537a30a2ad275c8bd9b63aefcdd894e6ab80be7b487080ed22266e3962215f1e7563319bb381ab92143a334b2487399ff1f9788132f78c120b64dd7f9274c25170aa2349d8ebfb46f9a99fb5396ed3bb8868ad6557111b5649387d6fcdba40315e253ec1bd42bc1c8f5e0ed1bb389a15e92e03a921'
    });
    await newUser.save();
    const num = parseInt(readline.question("\nEnter the number of stories you wish to seed (Each story may take upto 8-10 seconds) : "));
    if (num && num > 0) {
        console.log(`\nSeeding ${num} Stories, this may take several minutes...\n`);
        for (let i = 1; i <= num; i++) {
            // Assign same author.
            const oldAuthor = await User.findOne({ username: 'Unknown' });
            const author = oldAuthor._id.toString();
            // Select a random title and description.
            const { title, description } = findRandom(stories);
            const { city, state } = findRandom(cities);
            // Select images
            const images = await uploadSamplestoryImages();
            // Select a random location.
            const location = `${city}, ${state}`;
            // Creating new story.
            console.log(`Seeding Story ${i} into database...`);
            const story = new Story({ author, title, images, location, description });
            await story.save();
        }
        console.log("Data inserted successfully!");
    } else {
        console.log("No data was inserted!");
    }
};

// REQUIRING DATABASE URL
const dbURL = process.env.ATLAS_DATABASE_URL || 'mongodb://localhost:27017/khetisahayak';

// CONNECTING TO MONGO DATABASE USING MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(dbURL, {
    // PASSING REQUIRED OPTIONS TO AVOID DEPRECIATION WARNINGS IN FUTURE
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// VERIFING DATABASE CONNECTION
console.log("\nConnecting to the database...");
const databaseConnection = mongoose.connection;
// If failed.
databaseConnection.on("error", console.error.bind(console, "\nError!, Couldn't connect to the database.\nPossible Reason: Please check if you have mongodb and mongosh properly installed and mongod running...\n\nInstallation Guides:\n\nFor Windows Users: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/\nFor Mac Users: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/\nFor Linux Users: https://www.mongodb.com/docs/manual/administration/install-on-linux/\n\nOther Reasons:\n\n"));
// If successful.
databaseConnection.once("open", async () => {
    console.log("We are connected to the database and are good to go!\n");
    console.log("WARNING: THIS FILE IS USED TO SEED FAKE STORIES DATA INTO YOUR DATABASE!\nTHIS FILE WILL DELETE ALL YOUR EXISTING DATA BOTH FROM YOUR DATABASE AND CLOUDINARY ACCOUNT!");
    const permission = readline.question(`\nAre you really sure to continue? Type 'yes' to continue...\nNote: If you are running this file for the very first time, type 'yes'\n\nType Here: `);
    if (permission.toLowerCase() === "yes") {
        console.clear();
        console.log("\nProceeding...\n");
        await seedData()
            .then(() => {
                console.log("\nDisconnecting from the database...");
                mongoose.connection.close();
                console.log("We are disconnected to the database. Please check out for the changes!");
            })
            .catch((error) => {
                console.log("\nError!, Couldn't seed data into the database!", error);
            });
    } else {
        console.log("\nAborting...");
        console.log("Disconnecting from the database...");
        mongoose.connection.close();
        console.log("We are disconnected to the database. No changes were made!");
    }
});