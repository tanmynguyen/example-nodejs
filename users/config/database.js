var mysql = require('mysql');

var mysqlConnectString = {
    connectOptions : {
        development : {
            host     : '172.30.1.29',
            user     : 'dev_test',
            password : '123456',
            database : 'test_balance',
            multipleStatements: true,
        },
        test : {
            connectionLimit : 100,
            host     : '172.30.1.13',
            user     : 'root',
            password : '123456',
            database : 'test_my',
            multipleStatements: true,
        },
        production : {
            connectionLimit : 100,
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'nodejs_demo',
            multipleStatements: true,
        },
    }
}


var mysqlConnection = {
    
    //createConnection
    
    getConnection : function () {
         
        var createConnection = mysql.createConnection(mysqlConnectString.connectOptions.development);
        createConnection.connect(function (err) {
            if (err) { throw err }
            console.log('Open connect successfull!!!');
        });
        
        return createConnection;
    },
    
    closeConnection : function (currentConnection) {
        currentConnection.end(function(err){
            if (err) { throw err }
            console.log('Close connect successfull!!!');
        });
    },
    
    //createPool
    getPool : function (query, callback) {
        var createPool = mysql.createPool(mysqlConnectString.connectOptions.production);
        
        createPool.getConnection(function(err, connection){
            connection.query(query, function(err, rows){
            });
        });
        
    },
    
}

exports.mysqlConnection = mysqlConnection;