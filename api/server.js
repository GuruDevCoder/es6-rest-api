'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// 3rd party middleware
app.use((0, _cors2.default)({
    exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyLimit
}));

app.disable("x-powered-by");

app.set('view engine', 'handlebars');

app.engine('handlebars', require('hbs').__express);

app.use('/assets', _express2.default.static(_path2.default.join(__dirname, '../assets')));

app.use(_bodyParser2.default.json()); // for parsing application/json

app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    next();
});

(0, _db2.default)(function (db) {
    app.use('/api', (0, _api2.default)(db));
    app.server.listen(process.env.PORT || _config2.default.port);
    console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=server.js.map