const express = require('express');
const router = express.Router();

const User = require('../models/user') // user has application schema embedded


// we're already at
// GET /users/userId/application
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('applications/index.ejs', {
            applications: currentUser.applications
        });
        // pass the current user's applications to the index page
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
})

// POST /users/:userId/applications/new
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body) 
        // this changes the applications list in memory ONLY
        await currentUser.save(); 
        // this makes the changes permanent in the database
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;