const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const api = require('../../api/api/index');

const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({path: dotEnvPath});

exports.beforeEach = function (app, callback) {

    mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        app.set('view engine', 'handlebars');
        app.engine('handlebars', require('hbs').__express);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(function (req, res, next) {
            res.header("Content-Type",'application/json');
            next();
        });

        app.use('/api', api.default(database));
        callback();
    });

};

exports.express = function () {
    return express();
};
