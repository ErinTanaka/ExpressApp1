'use strict';
module.exports = function () {
    var express = require('express');
    var router = express.Router();

    console.log("signup router")

    router.get('/', function (req, res) {
       
        console.log("render sign up");
        res.render('signup', { title: 'Erin\'s DevOps Web App: Sign Up' });
    });

    router.post('/addaccount', function (req, res) {
        console.log("signup addaccount");
        console.log(req.body);
        var isUser = null;
        var username = req.body.username;
        var password = req.body.password;
        var confpassword = req.body.confpassword;
        var sql = require("mssql");
        var config = {
            user: 'sa',
            password: 'Password1234!',
            server: '192.168.0.135',
            database: 'devOpsLabDB'
        };

        if (password == confpassword) {
            console.log("Passwords match");
            sql.connect(config, function (err) {
                if (err) console.log(err);
                // create Request object
                var requestUser = new sql.Request();
                var strquery = "select * from Logins where uname = '" + username + "'"
                console.log(strquery);
                // query to the database and get the records
                requestUser.query(strquery, function (err, recordset) {
                    if (err) console.log(err);
                    console.log("whats the length of the record set?");
                    console.log(recordset.rowsAffected[0]);
                    if (recordset.rowsAffected[0] == 0) {
                        console.log("user doesn't exist");
                        isUser = false;
                    } else {
                        console.log("user already exists");
                        isUser = true;
                    }
                //    res.send(output);
                });
                
                // query to the database to add record if necessary
                console.log(isUser);
                if (isUser == false) {
                    console.log("gonna add it to db")
                    var requestAdd = new sql.Request();
                    strquery = "insert into Logins (uname, pswd) values ('" + username + "', '" + password + "'";
                    requestAdd.query(strquery, function (err, recordset) {
                        console.log(recordset);
                    });
                }
                
             });
        } else {
            console.log("paswords dont match");
            
        }

        console.log("last chance");
        console.log(isUser)
        res.redirect('/welcome');
    });

    console.log('return signup');

    return router;
}();
