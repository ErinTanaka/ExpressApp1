// JavaScript source code
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.0.135',
    user: 'root',
    password: 'Password1234!',
    database: 'testdb'
});
module.exports.pool = pool;