'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    var router = _express2.default.Router({ mergeParams: true });

    router.get('/', function (req, res) {

        var context = {
            exampleString: 'visitor'
        };

        var template = __dirname + '/views/homedoc';
        return res.status(200).render(template, context);
    });

    return router;
};
//# sourceMappingURL=index.js.map