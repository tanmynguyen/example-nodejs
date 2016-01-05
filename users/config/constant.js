var path = require('path');

var Constant = {
    __dirroot = path.dirname(module.parent.filename);
}

exports.Constant = Constant;