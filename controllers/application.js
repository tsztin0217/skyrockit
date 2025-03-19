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

// GET /users/:userId/applications/:applicationId when making this request we're already here
router.get('/:applicationId', async (req, res) => {
    try {
        // look up the user that's currently logged in
        const currentUser = await User.findById(req.session.user._id);

        // find the subdocument in the currently logged in user's application list
        const application = currentUser.applications.id(req.params.applicationId);

        // render a show template with the subdocument's details
        res.render('applications/show.ejs', {
            application 
            // property shorthand syntax whenever 
            // the property name and variable name holding the same value
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();

        await currentUser.save() // this makes the change in the database

        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
 }
});

// GET users/:userId/applications/:applicationId/edit
// controllers/applications.js

router.get('/:applicationId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const application = currentUser.applications.id(req.params.applicationId);
      res.render('applications/edit.ejs', {
        application: application,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  


// PUT /users/:userId/applications/:applicationId
// controllers/applications.js`

  
router.put('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        application.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})
module.exports = router;