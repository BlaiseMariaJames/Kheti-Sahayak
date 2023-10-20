// REQUIRING EXPRESS AND PASSPORT
const express = require("express");
const passport = require("passport");

// CREATING ROUTER INSTANCE 
const router = express.Router();

// REQUIRING USER CONTROLLER
const User = require("../controllers/User Controller");

// REQUIRING WRAPPER FUNCTION TO HANDLE ASYNC ERRORS
const handleAsyncErrors = require("../utilities/Error Handling/Async Error Handling Middleware Function.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF ANY USER IS ALREADY LOGGED IN 
const isAlreadyLoggedIn = require("../utilities/Authentication/Check If Already Logged In.js");

// REQUIRING MIDDLEWARE FUNCTION TO CHECK IF ANY USER IS ALREADY LOGGED OUT
const isAlreadyLoggedOut = require("../utilities/Authentication/Check If Already Logged Out.js");

// RESPONDING TO THE SERVER AT USER MODEL BASED ROUTE

// Login-Register --> Form to login / register a user.
router.get('/', isAlreadyLoggedIn, User.renderForm);

// Create --> Create a new user account.
router.post('/register', handleAsyncErrors(User.createUser));

// Authenticate --> Authenticate a user.
router.post('/login', isAlreadyLoggedIn, passport.authenticate('local', { failureFlash: true, failureRedirect: '/', keepSessionInfo: true }), User.authenticateUser);

// Logout --> Logout a user.
router.post('/logout', isAlreadyLoggedOut, User.logoutUser);

// EXPORTING ROUTER INSTANCE
module.exports = router;