var mysql = require('mysql');

var mysqlConnectString = {
    connectOptions : {
        development : {
            host     : '172.30.1.13',
            user     : 'root',
            password : '123456',
            database : 'nahi_sso_prod',
        },
        test : {
            host     : '172.30.1.13',
            user     : 'root',
            password : '123456',
            database : 'nahi_sso_prod',
        },
        production : {
            host     : '172.30.1.13',
            user     : 'root',
            password : '123456',
            database : 'nahi_sso_prod',
        },
    }
}


var mysqlConnection = {
    
    getConnection : function () {
        var connection = mysql.createConnection(mysqlConnectString.connectOptions.development);
        
        connection.connect(function (err) {
            if (err) { throw err }
            console.log('Connect successfull!!!');
        });
        
        return connection;
    },
    
    closeConnection : function (currentConnection) {
        currentConnection.end(function(err){
            if (err) { throw err }
            console.log('Close connect successfull!!!');
        });
    }
    
}

exports.mysqlConnection = mysqlConnection;