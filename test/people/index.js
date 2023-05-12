require('app-module-path').addPath(process.env.HOME_DIR + '/test');

var request = require('supertest');

var server = require('../support/server');

describe('People API', function () {
    var app;

    beforeEach(function (done) {
        app = server.express();
        server.beforeEach(app, function () {
            done();
        });
    });

    afterEach(function () {

    });

    describe('GET /', function () {

        it('should have proper headers', function (done) {
            request(app)
                .get('/api/people')
                .expect('Content-Type', /json/)
                .expect(200, done)
                .expect(function (res) {
                    res.headers.should.have.properties(['content-type', 'etag']);
                });
        });

        it('should have proper uber+json content-type', function (done) {
            request(app)
                .get('/api/people')
                .expect(200, done)
                .expect(function (res) {
                    res.headers['content-type'].should.equal('application/json; charset=utf-8');
                });
        });

    });

    describe('POST /', function () {

        it('responds to / with a 200 OK', function (done) {
            request(app)
                .post('/api/people')
                .send({firstName: 'Manny', lastName: 'cat'})
                .expect(201, done);
        });

        it('response body should be valid', function (done) {
            request(app)
                .post('/api/people')
                .send({firstName: 'Manny', lastName: 'Cat'})
                .expect(function (res) {
                    res.body.firstName.should.equal('Manny');
                    res.body.lastName.should.equal('Cat');
                })
                .expect(201, done);
        });

        it('responds to / with a 400 Bad Request', function (done) {
            request(app)
                .post('/api/people')
                .send({fakeIdentifier: 'Fake'})
                .expect(400, done);
        });

    });


});
