'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        console.log("render networkaccess");
        var sessionUname = req.session.username
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
            //var addToTable = null;
            var request = new sql.Request();
            var strquery = "insert into NetworkAccess (uname) values (" + sessionUname + "') where not exists (select * from NetworkAccess where uname = '" + sessionUname + "')";
            var myquery = "insert into NetworkAccess(uname) Select '" + sessionUname + "' Where not exists(select * from NetworkAccess where uname = '" + sessionUname + "');";
            request.query(myquery, function (err, recordset) {
                if (err) console.log(err);
                console.log("did the query yo");
                console.log(recordset.rowsAffected[0]);
                console.log(recordset);
                
            });

            //strquery = "insert into NetworkAccess (uname) values ('" + sessionUname + "')";
            //// query to the database and get the records
            //request.query(strquery, function (err, recordset) {
            //    if (err) console.log(err);
            //    console.log("whats the length of the record set?");
            //    console.log(recordset.rowsAffected[0]);
            //    console.log(recordset);
                
            //});
            //var req2 = new sql.Request();
            //req2.query(, function (err, recordset) {
            //    if (err) console.log(err);
            //    console.log("whats the length of the record set?");
            //    console.log(recordset.rowsAffected[0]);
            //    console.log(recordset);

            //});
        });
        res.render('networkaccess', { title: 'Erin\'s DevOps Web App: network access' });
    });

    

    return router;
}();
