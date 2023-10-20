// DEFINING MIDDLEWARE FUNCTION TO CHECK IF ANY USER IS ALREADY LOGGED OUT
function checkIfLoggedOut(request, response, next) {
    if (!request.isAuthenticated()) {
        request.flash('success', 'You are already logged out!');
        return response.redirect('/stories');
    }
    next();
}

module.exports = checkIfLoggedOut;