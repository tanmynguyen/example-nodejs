
var mydb = require('../../../config/database');
var md5 = require('MD5');
var mysql = require('mysql');

var Model_Users = {
        
    getAllUsers : function (callback) {
        
        var users = [];
        var query = 'select * from ??';
        var table = ['users'];
        query = mysql.format(query, table);
        
        mydb.mysqlConnection.getMemcachedConnection();
        
//        var connect = mydb.mysqlConnection.getPool();
        var connection = mydb.mysqlConnection.getConnection();
        
//        connect.getConnection(function(err, connection){
            
//            if (err) {
//                console.log(err);
//                callback(err);
//            }
            if (connection) {
                connection.query(query, function(err, rows, fieds){
//                    connection.release(); //<-- fixed issue
                    if (err) { console.log(err); }

                    rows.forEach(function (row){
                       users.push(row); 
                    });

                    
                    mydb.memcached.set('user', users, 10000, function(err){
                        if(err) throw new err;
                    });
//
                    mydb.memcached.get('user', function(err, data){
                        callback(data);
                    });
                    
                    //https://github.com/felixge/node-mysql/issues/712 <-- issue 'too many connection'
//                    connection.release();
                    
                });
            }
//        });
        
        var connection = mydb.mysqlConnection.closeConnection(connection);
//        
//        mydb.mysqlConnection.closePool();
    },
    getUsersById : function (id, callback) {
//        var connection = mydb.mysqlConnection.getConnection();
        var connect = mydb.mysqlConnection.getPool();
        
        var users = [];
        var query = 'select * from users where id = ' + id;
        connect.getConnection(function(err, connection){
            if (err) {
                console.log(err);
                callback(err);
            }
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
        var connection = mydb.mysqlConnection.getConnection();
//        var connect = mydb.mysqlConnection.getPool();
        var users = [];
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["users","username","password","email", user.username, md5(user.password), user.email];
        
        query = mysql.format(query,table);
        
        var new_sql = '';
        
//        connect.getConnection(function(err, connection){
//            if (err) {
//                console.log(err);
//                callback(err);
//            }
//            if (connection) {
//                var i = 0;
//                for(i;i<20;i++){
//                    new_sql = new_sql + query + ' ; ';
//                }
//                var j = 0;
//                for(j;j<1;j++){
                    connection.query(query, function(err, row, fieds){
                        var mesg = 'User Added!!!';
                        callback(mesg);
                    });
//                }
//                connection.release();
//            }
//        });
        mydb.mysqlConnection.closeConnection(connection);
//        mydb.mysqlConnection.closePool();
    },
    
};

exports.Model_Users = Model_Users;
