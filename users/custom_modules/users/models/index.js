
var mydb = require('../../../config/database');
var md5 = require('MD5');
var mysql = require('mysql');

var Model_Users = {
        
    getAllUsers : function (callback) {
        
        var users = [];
        var query = 'select * from users';
        
        var connect = mydb.mysqlConnection.getPool();
        
        connect.getConnection(function(err, connection){
            if (err) { throw err }
            if (connection) {
            
                connection.query(query, function(err, rows, fieds){

                    rows.forEach(function (row){
                       users.push(row); 
                    });

                    callback(users);
                });
            }
            connection.release();
        });
        
//        var connection = mydb.mysqlConnection.getConnection();
//        
        mydb.mysqlConnection.closePool();
    },
    getUsersById : function (id, callback) {
//        var connection = mydb.mysqlConnection.getConnection();
        var connect = mydb.mysqlConnection.getPool();
        
        var users = [];
        var query = 'select * from users where id = ' + id;
        connect.getConnection(function(err, connection){
            if (err) { throw err }
            if (connection) {
                connection.query(query, function(err, row, fieds){

                    if (row.length <= 0) {
                        callback(null);
                    } else {
                        callback(row[0]);
                    }
                });
            }
        });
        mydb.mysqlConnection.closePool();
    },
    addUsers : function (user, callback) {
//        var connection = mydb.mysqlConnection.getConnection();
        var connect = mydb.mysqlConnection.getPool();
        var users = [];
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["users","username","password","email", user.username, md5(user.password), user.email];
        
        query = mysql.format(query,table);
        
        var new_sql = '';
        
        connect.getConnection(function(err, connection){
            if (err) { throw err }
            if (connection) {
                var i = 0;
                for(i;i<25000;i++){
                    new_sql = new_sql + query + ' ; ';
                }
                var j = 0;
                for(j;j<4;j++){
                    connection.query(new_sql, function(err, row, fieds){
                        var mesg = 'User Added!!!';
                        callback(mesg);
                    });
                }
            }
            connection.release();
        });
//        mydb.mysqlConnection.closeConnection(connection);
        mydb.mysqlConnection.closePool();
    },
    
};

exports.Model_Users = Model_Users;
