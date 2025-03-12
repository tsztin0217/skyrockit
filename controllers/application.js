const express = require('express');
const router = express.Router();

const User = require('../models/user') // user has application schema embedded


// we're already at
// GET /users/userId/application
router.get('/', async (req, res) => {
    try {
        res.render('applications/index.ejs');
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})


module.exports = router;