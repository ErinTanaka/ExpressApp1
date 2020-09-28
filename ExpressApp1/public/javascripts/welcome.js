'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();
    console.log("welcome router");
    
    router.get('/', function (req, res) {
        console.log("render welcome");
        console.log(req.session.username);
        res.render('welcome', { title: 'Erin\'s DevOps Web App: Welcome' });
    });

    console.log('returning welcome');

    return router;
}();
