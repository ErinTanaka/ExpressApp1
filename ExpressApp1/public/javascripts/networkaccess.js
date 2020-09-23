'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        console.log("render networkaccess");
        res.render('networkaccess', { title: 'Erin\'s DevOps Web App: network access' });
    });

    

    return router;
}();
