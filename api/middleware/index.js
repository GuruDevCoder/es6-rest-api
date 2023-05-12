'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var routes = (0, _express.Router)();

    // add middleware here
    // console.log('routes',routes);
    // console.log('config',config);
    // console.log('db',db);

    return routes;
};
//# sourceMappingURL=index.js.map