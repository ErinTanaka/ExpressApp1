'use strict';
var express = require('express');
var router = express.Router();

router.get('/login-page', function (req, res) {
    res.render('login-page', { title: 'Erin\'s DevOps Web App' });
});

module.exports = router;