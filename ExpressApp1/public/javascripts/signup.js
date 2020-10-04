'use strict';
module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var bcrypt = require('bcrypt');
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
            //encrypt the passwords
            var saltRounds = 10
            const hash = bcrypt.hashSync(password, saltRounds);
            sql.connect(config, function (err) {
                if (err) console.log(err);
                // create Request object
                var requestUser = new sql.Request();

                var strquery = "IF NOT EXISTS(SELECT * FROM Logins WHERE uname = '" + username + "')  BEGIN INSERT INTO Logins(uname, pswd) VALUES('" + username + "', '" + hash.toString() + "') END";
                console.log(strquery);

                // query to the database and get the records
                requestUser.query(strquery, function (err, recordset) {
                    if (err) console.log(err);
                    console.log("whats the length of the record set?");
                    console.log(recordset);
                    if (recordset.rowsAffected[0] === undefined) {
                        console.log("its undefined?")
                        res.redirect("/signup");
                    } else {
                        res.redirect("/login")
                    }

                });
                
             });
        } else {
            console.log("paswords dont match");
            res.redirect('/signup');
        }

        
    });

    console.log('return signup');

    return router;
}();
