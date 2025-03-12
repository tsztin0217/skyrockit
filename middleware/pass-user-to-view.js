const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    // anything we need to access in our templates GLOBALLY
    // can be added as a property to res.locals
    // res is short for response
    // generating templates is part of the response
    next();
}

module.exports = passUserToView;
/*
if(req.session.user) {
    res.locals.user = req.session.user
    } else {
     res.locals.user = null
};
*/