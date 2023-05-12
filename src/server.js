require('dotenv').config();

import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import InitializeDB from './db';

import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.disable("x-powered-by");

app.set('view engine', 'handlebars');

app.engine('handlebars', require('hbs').__express);

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next)=> {
    res.header("Content-Type",'application/json');
    next();
});

InitializeDB(db => {
    app.use('/api', api(db));
    app.server.listen(process.env.PORT || config.port);
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;
