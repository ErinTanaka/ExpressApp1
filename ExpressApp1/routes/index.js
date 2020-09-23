'use strict';
console.log("global variables?");
//console.log(sqltestconfig);
module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var session = require('express-session');

    router.get('/', function (req, res) {
        console.log("render index");
        console.log(req.sessionID);
        res.render('index', { title: 'Erin\'s DevOps Web App' });
    });

    console.log('h');

    return router;
}();
