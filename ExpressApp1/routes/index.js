'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        console.log("render index");
        res.render('index', { title: 'Erin\'s DevOps Web App' });
    });

    console.log('h');

    return router;
}();
