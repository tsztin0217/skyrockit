const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    // if a user is signed in, call the next middleware function
    // otherwise we redirect them to the sign-in page
    res.redict('/auth/signed-in');
}

module.exports = isSignedIn;