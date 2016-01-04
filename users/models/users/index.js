var mysql = require('mysql');

//var mydb = require('../config/database');

var users = exports.users = [];

//function Model_Users(){
//    var self = this;
//    self.connectMysql();
//}
//
//Model_Users.prototype.connectMysql = function(){
//    var self = this;
//    mydb.getConnection(function(err,connection){
//        if(err) {
//          self.stop(err);
//        } else {
//          self.configureExpress(connection);
//        }
//    });
//}
//
//
//
//exports.getAllUsers = function(connection){
//    var query = 'select * from ??';
//    var table = ['users'];
//    query = mysql.format(query,table);
//    
//    connection.query(query,function(err,rows){
//        if(err) {
//            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
//            
//        } else {
//            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
//        }
//        return rows;
//    });
//}




users.push({ name: 'Mỹ', id: 0  });
users.push({ name: 'Bình', id: 1 });
users.push({ name: 'Duy', id: 2 });

