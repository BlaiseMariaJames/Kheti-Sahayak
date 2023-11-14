// REQUIRING EXPRESS AND CLOUDINARY STORAGE
const express = require("express");
const { storage } = require("../utilities/cloudinary/Cloudinary Configuration.js");

// MULTER CONFIGURATION
const multer = require("multer");
const upload = multer({ storage });

// CREATING ROUTER INSTANCE
const router = express.Router();

// REQUIRING STORY CONTROLLER
const Story = require("../controllers/Story Controller.js");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../utilities/error handling/Async Error Handling Middleware Function.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF USER IS LOGGED IN 
const isLoggedIn = require("../utilities/authentication/Check If Logged In.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF STORY ID IS VALID, STORY EXISTS AND CURRENT USER IS AUTHORIZED
const isAuthorized = require("../utilities/authorization/Check If Is Authorized For Story.js");

// RESPONDING TO THE SERVER AT STORY MODEL BASED ROUTE

router.route('/')
    .get(handleAsyncErrors(Story.allStoriess))
    .post(isLoggedIn, upload.array('story[images]'), handleAsyncErrors(Story.createstory))
    .put(isLoggedIn, upload.array('story[images]'), isAuthorized, handleAsyncErrors(Story.redesignstory))
    .patch(isLoggedIn, isAuthorized, handleAsyncErrors(Story.updatestory))
    .delete(isLoggedIn, isAuthorized, handleAsyncErrors(Story.deletestory));

router.get('/new', isLoggedIn, Story.renderNewForm);
router.get('/:id', handleAsyncErrors(Story.showstory));
router.get('/:id/manage', isLoggedIn, isAuthorized, handleAsyncErrors(Story.renderManageForm));
router.get('/:id/edit', isLoggedIn, isAuthorized, handleAsyncErrors(Story.renderEditForm));
router.get('/:id/remove', isLoggedIn, isAuthorized, handleAsyncErrors(Story.renderRemoveForm));

// EXPORTING ROUTER INSTANCE
module.exports = router;