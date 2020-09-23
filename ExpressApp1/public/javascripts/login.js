'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        console.log("render login");
        res.render('login', { title: 'Erin\'s DevOps Web App: Login' });
    });

    router.post('/auth', function (req, res) {
        console.log("login auth");
        res.redirect('/welcome');
    });

    return router;
}();
