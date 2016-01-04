
var mydb = require('../../config/database');

var Model_Users = {
    
    getAllUsers : function (callback) {
        var connection = mydb.mysqlConnection.getConnection();
        
        var users = [];
        var query = 'select * from users';
        
        if (connection) {
            
            connection.query(query, function(err, rows, fieds){
                
                rows.forEach(function (row){
                   users.push(row); 
                });
                
                callback(users);
            });
        }
        mydb.mysqlConnection.closeConnection(connection);
    },
    getUsersById : function (id, callback) {
        var connection = mydb.mysqlConnection.getConnection();
        
        var users = [];
        var query = 'select * from users where id = ' + id;
        
        if (connection) {
            
            connection.query(query, function(err, row, fieds){
                
                if (row.length <= 0) {
                    callback(null);
                } else {
                    callback(row[0]);
                }
            });
        }
        mydb.mysqlConnection.closeConnection(connection);
    }
    
};

exports.Model_Users = Model_Users;
