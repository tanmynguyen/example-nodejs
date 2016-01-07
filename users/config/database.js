var mysql = require('mysql');

var mysqlConnectString = {
    connectOptions : {
        development : {
            connectionLimit : 10,
            host     : '202.43.110.118',
            user     : 'dev2',
            password : '',
            database : 'test_balance',
            multipleStatements: true,
        },
        test : {
            connectionLimit : 10,
            host     : '172.30.1.13',
            user     : 'root',
            password : '123456',
            database : 'test_my',
            multipleStatements: true,
        },
        production : {
            connectionLimit : 10,
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
            if (err) { console.log(err) }
            console.log('Open connect successfull!!!');
        });
        
        return createConnection;
    },
    
    closeConnection : function (currentConnection) {
        currentConnection.end(function(err){
            if (err) { console.log(err) }
            console.log('Close connect successfull!!!');
        });
    },
    
    //createPool
    getPool : function () {
        var createPool = mysql.createPool(mysqlConnectString.connectOptions.production);
        console.log('Open connect successfull!!!');
        return createPool;
    },
    
    closePool : function () {
        var createPool = mysql.createPool(mysqlConnectString.connectOptions.production);
        createPool.end(function (err){
            if (err) { console.log(err) }
            console.log('Close connect successfull!!!');
        });
    }
    
}

exports.mysqlConnection = mysqlConnection;