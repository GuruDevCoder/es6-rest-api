'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _Scraper = require('./Scraper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {

    var router = _express2.default.Router({ mergeParams: true });

    router.get('/', function (req, res) {
        var scraper = new _Scraper.Scraper();

        scraper.crawl().then(function (output) {
            res.status(200).send(JSON.stringify(output));
        }).catch(function (errCode) {
            res.status(500).send(JSON.stringify({ error: errCode }));
        });
    });

    return router;
};
//# sourceMappingURL=index.js.map