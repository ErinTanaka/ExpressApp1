'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Erin\'s DevOps Web App' });
});

router.get('/login-page', function (req, res) {
    res.render('login-page', { title: 'Erin\'s DevOps Web App' });
});

router.get('/sign-up-page', function (req, res) {
    res.render('sign-up-page', { title: 'Erin\'s DevOps Web App' });
});

module.exports = router;
