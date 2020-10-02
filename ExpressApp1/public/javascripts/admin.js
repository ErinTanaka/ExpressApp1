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


    function getAccessReqs(res, context, complete) {
        var connection = new sql.ConnectionPool(config, function (err) {
            var request = new sql.Request(connection);
            request.query("select uname from NetworkAccess where access = 'false'", function (err, res) {
                console.log(res.recordset);
                var tmp = res.recordset;
                console.log(tmp);
                if (tmp === undefined || tmp.length == 0) {
                    // array empty or does not exist
                    console.log("this works");
                    context.User = tmp;

                } else {
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
                    context.User = mylist;
                }
                
                complete();
            });
        });
    }

    router.get('/', function (req, res) {
        console.log("render admin");
        console.log(req.session.username);
        var callbackCount = 0;

        var context = { title: 'Erin\'s DevOps Web App: Admin' };

        getAccessReqs(res, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('admin', context);
            }
        }    
    });

    router.post('/grant', function (req, res) {
        console.log("grant?");
        console.log(req.body);
        console.log("doon");
        var keys = Object.keys(req.body);
        //build my query to update table
        var dynamicquery = "";
        for (var i = 0; i < keys.length; i++) {
            console.log(i);
            if (i == 0) {
                var tmp = "uname = '" + keys[i] + "' "
                console.log(tmp);
                dynamicquery = dynamicquery.concat(tmp);
                console.log(dynamicquery);
            } else {
                var tmp = "OR uname = '" + keys[i] + "' "
                console.log(tmp);
                dynamicquery = dynamicquery.concat(tmp);
                console.log(dynamicquery);
            }
        }
        console.log(dynamicquery);
        if (dynamicquery != "") {
            console.log("lets go");
            var strquery = "update NetworkAccess set access = 'true' where " + dynamicquery

            sql.connect(config, function (err) {
                if (err) console.log(err);
                var myreq = new sql.Request();
                myreq.query(strquery, function (err, recordset) {
                    if (err) console.log(err);
                    console.log(recordset);
                    res.redirect('/admin');
                });
            });
        }
    });

    

    return router;
}();