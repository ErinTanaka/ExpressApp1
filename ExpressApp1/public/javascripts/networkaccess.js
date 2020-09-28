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
    function updateDB(res, context, complete) {
        var connection = new sql.ConnectionPool(config, function (err) {
            var request = new sql.Request(connection);
            var query = "Update NetworkAccess Set access='false' Where uname = '" + context.uname + "';";
            request.query(query, function (err, res) {
                complete();
            });
        });
    }



    router.get('/', function (req, res) {
        console.log("render networkaccess");
        var sessionUname = req.session.username
        console.log(sessionUname);
        console.log(req.session.username);
        var callbackCount = 0;

        var context = { title: 'Erin\'s DevOps Web App: Admin', uname: sessionUname };
        updateDB(res, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('networkaccess', { title: 'Erin\'s DevOps Web App: network access' });
            }
        }
        
        
       

          
    });

    


    return router;
}();
