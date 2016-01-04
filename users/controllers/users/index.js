var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db_users = require('../../models/users/index');



router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
    db_users.Model_Users.getAllUsers(function(user){
        res.render(
            'users/list', 
            { 
                title: 'DevSwat',
                users: user
            }
        );    
    });
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db_users.Model_Users.getUsersById(id, function(user){
        res.render(
            'users/detail', 
            {
                title: 'DevSwat',
                user: (user!=null?user:false)
            }
        );    
    });
});

module.exports = router;