'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var bcrypt = require('bcrypt');
    var saltRounds = 10;
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
            var strquery = "select pswd from Logins where uname = '" + username + "'";
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
                    console.log("user in db hased pswd is: ");
                    console.log(recordset.recordset[0].pswd);
                    var rethash =  recordset.recordset[0].pswd;
                    var match = bcrypt.compareSync(password, rethash);
                    console.log(match);
                    if (match) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        if (username == 'admin') {
                            res.redirect('/admin')
                        } else {
                            res.redirect('/welcome');
                        }
                    } else {
                        res.redirect('/login');
                    }
                    
                }
            });
        });

        //res.redirect('/');
    });

    return router;
}();
