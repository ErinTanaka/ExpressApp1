'use strict';

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    var sql = require("mssql");

    var config = {
        user: 'sa',
        password: 'Password1234!',
        server: '192.168.0.135',
        database: 'devOpsLabDB'
    };

    function getAccessReqs() {
        var connection = new sql.ConnectionPool(config, function (err) {
            var request = new sql.Request(connection);
            request.query("select uname from NetworkAccess where access = 'false'", function (err, res) {
                console.log(res.recordset);
                var tmp = res.recordset;
                var item = tmp[0].unamame;
                var mylist = [];
                var i;
                for (i = 0; i < tmp.length; i++) {
                    mylist.push(tmp[i].uname);
                }
                //len = recordset.length;
                //console.log(len);
                //console.log(recordset[0])
                //console.log(result.recordset.entries);
                console.log(mylist);
                return mylist;
            });
        });
    }

    router.get('/', function (req, res) {
        console.log("render welcome");
        console.log(req.session.username);
        
        var tmpcontext = {
            title: 'Erin\'s DevOps Web App: Admin', User: ['one', 'two'] };
        var listy = getAccessReqs();
        console.log("its listy"+listy);
        
        res.render('admin', tmpcontext);      
    });

    

    return router;
}();