var mysql = require('mysql');

var mydb      =    mysql.createPool({
        connectionLimit : 100,
        host     : '172.30.1.13',
        user     : 'root',
        password : '123456',
        database : 'nahi_sso_prod',
        debug    :  false
    });


module.exports = mydb;