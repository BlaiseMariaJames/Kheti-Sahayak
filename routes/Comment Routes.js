// REQUIRING EXPRESS
const express = require("express");

// CREATING ROUTER INSTANCE 
const router = express.Router({ mergeParams: true });

// REQUIRING COMMENT CONTROLLER
const Comment = require("../controllers/Comment Controller.js");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../utilities/Error Handling/Async Error Handling Middleware Function.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF USER IS LOGGED IN 
const isLoggedIn = require("../utilities/Authentication/Check If Logged In.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF CURRENT USER IS AUTHORIZED
const isAuthorized = require("../utilities/Authorization/Check If Is Authorized For Comment.js");

// RESPONDING TO THE SERVER AT COMMENT MODEL BASED ROUTE

// Create --> Creates new comment on server.
router.post('/', isLoggedIn, handleAsyncErrors(Comment.createComment));

// Delete --> Deletes a comment on server.
router.delete('/:commentId', isLoggedIn, isAuthorized, handleAsyncErrors(Comment.deleteComment));

// EXPORTING ROUTER INSTANCE
module.exports = router;