// REQUIRING USER MODEL AND SCHEMA
const User = require("../models/Mongoose Models/User Model.js");
const UserSchema = require("../models/Joi Models/User Model.js");

// REQUIRING APPLICATION ERROR HANDLER CLASS 
const ApplicationError = require("../utilities/Error Handling/Application Error Handler Class.js");

// Login-Register --> Form to login / register a user.
module.exports.renderForm = (request, response) => {
    response.render('users/Login-Signup Page', { title: "Kheti Sahayak" });
}

// Create --> Create a new user account.
module.exports.createUser = async (request, response, next) => {
    const { username, email, password } = request.body.register;
    const { error } = UserSchema.validate(request.body.register);
    // IF ANY SCHEMATIC ERROR
    if (error) {
        let errorMessage = error.details.map(error => error.message).join(',');
        // Below two lines of code will redirect to the same page and make user aware of errors.
        request.flash('error', `Cannot create user account, ${errorMessage}.`);
        return response.status(400).redirect('/');
    }
    const newUser = new User({ username, email });
    try {
        const registeredUser = await User.register(newUser, password);
        request.login(registeredUser, function (error) {
            if (error) {
                return next(new ApplicationError(error.message, error.name));
            }
            request.flash('success', 'Successfully created a new user account!');
            response.redirect(`/stories`);
        });
    }
    // IF ANY PASSPORT-LOCAL-MONGOOSE ERROR
    catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000 && error.keyValue.email) {
            // Below two lines of code will redirect to the same page and make user aware of errors.
            request.flash('error', "Cannot create user account, A user with the given email is already registered.");
            return response.status(400).redirect('/');
        }
        // Below two lines of code will redirect to the same page and make user aware of errors.
        request.flash('error', `Cannot create user account, ${error.message}.`);
        return response.status(400).redirect('/');
    }
}

// Authenticate --> Authenticate a user.
module.exports.authenticateUser = (request, response) => {
    request.flash('success', 'Welcome Back!');
    const redirectUrl = request.session.returnTo || '/stories';
    delete request.session.returnTo;
    response.redirect(redirectUrl);
}

// Logout --> Logout a user.
module.exports.logoutUser = (request, response, next) => {
    request.logout(function (error) {
        if (error) {
            return next(new ApplicationError(error.message, error.name));
        }
        request.flash('success', 'Goodbye!');
        response.redirect('/stories');
    });
}