'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        console.log("render login");
        console.log(req.sessionID);
        res.render('login', { title: 'Erin\'s DevOps Web App: Login' });
    });

    router.post('/auth', function (req, res) {
        console.log("login auth");
        var username = req.body.username;
        var password = req.body.password;

        var sql = require("mssql");
        var config = {
            user: 'sa',
            password: 'Password1234!',
            server: '192.168.0.135',
            database: 'devOpsLabDB'
        };
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            var strquery = "select * from Logins where uname = '" + username + "' and pswd = '" + password + "'";
            console.log(strquery);
            // query to the database and get the records
            request.query(strquery, function (err, recordset) {
                if (err) console.log(err);
                console.log("whats the length of the record set?");
                console.log(recordset.rowsAffected[0]);
                if (recordset.rowsAffected[0] == 0) {
                    console.log("user doesn't exist");
                    res.redirect('/login');
                } else {
                    console.log("user in db");
                    req.session.loggedin = true;
                    req.session.username = username;
                    if (username == 'admin') {
                        res.redirect('/admin')
                    } else {
                        res.redirect('/welcome');
                    }
                }
                //    res.send(output);
            });

            // query to the database to add record if necessary
         

        });

        //res.redirect('/');
    });

    return router;
}();
