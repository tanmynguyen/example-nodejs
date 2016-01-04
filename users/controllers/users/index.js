var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db_users = require('../../models/users/index');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/list', 
                    { 
                        title: 'DevSwat',
                        content: db_users.users
                    });
});

module.exports = router;
