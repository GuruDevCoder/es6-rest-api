'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _people = require('./people');

var _people2 = _interopRequireDefault(_people);

var _scraper = require('./scraper');

var _scraper2 = _interopRequireDefault(_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
    var api = (0, _express.Router)();

    api.get('/', function (req, res) {
        res.json({ version: _package.version });
    });

    api.use('/home', (0, _home2.default)(db));
    api.use('/people', (0, _people2.default)(db));
    api.use('/scrape', (0, _scraper2.default)(db));

    return api;
};
//# sourceMappingURL=index.js.map