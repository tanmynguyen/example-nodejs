var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

 

var db_users = require('../../models/users/index');

var define = require("node-constants")(exports);


router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    db_users.Model_Users.getAllUsers(function(user){
        res.json({"Message" : "Success", "Users" : user});
//        res.render(
//            'users/list', 
//            { 
//                title: 'DevSwat',
//                users: user
//            }
//        );    
    });
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db_users.Model_Users.getUsersById(id, function(user){
        res.json({"Message" : "Success", "Users" : user});
//        res.render(
//            'users/detail', 
//            {
//                title: 'DevSwat',
//                user: (user!=null?user:false)
//            }
//        );    
    });
});

router.post('/', function(req, res, next){
//    res.setHeader("Content-Type", "application/json");
//    req.body.user,md5(req.body.password),req.body.email
    var user = {
        username : req.body.user,
        password : req.body.password,
        email : req.body.email
    };
    db_users.Model_Users.addUsers(user, function(users){
        res.json({'Message' : users})
    });
});

module.exports = router;