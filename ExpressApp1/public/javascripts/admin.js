'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();
    function getallRequests(res, sql, context, complete) {
        sql.query("select uname as 'User' from NetworkAccess where access = false", function (err, recordset) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.requests = results;
            complete();
        });
        
    }

    router.get('/', function (req, res) {
        console.log("render welcome");
        console.log(req.session.username);
        
        var callbackCount = 0;
        
        var context = {
            title: 'Erin\'s DevOps Web App: Admin', User: ['one', 'two'] };
        //getallRequests(res, mssql, context, complete);
        var sql = require("mssql");
        var config = {
            user: 'sa',
            password: 'Password1234!',
            server: '192.168.0.135',
            database: 'devOpsLabDB'
        };

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('admin', context);
            }
        }

        sql.connect(config, function (err) {
            sql.query("select uname as 'User' from NetworkAccess where access = false", function (err, recordset) {
                if (error) {
                    console.log(error);
                }
                
                console.log("sqlquery");
                console.log(recordset);
                complete();
                
            });
        });

        //sql.query("select uname as 'User' from NetworkAccess where access = false", function (err, recordset) {
        //    if (error) {
        //        res.write(JSON.stringify(error));
        //        res.end();
        //    }
        //    context.requests = results;
        //    complete();
        //});
        
        //var listData = ['fuck', 'shit', 'crap'];
        //res.render('admin', context);
    
        
    });

    

    return router;
}();