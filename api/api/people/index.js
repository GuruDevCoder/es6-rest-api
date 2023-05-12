'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {

    var collection = db.collection('mycollection');
    var router = _express2.default.Router({ mergeParams: true });

    var handleError = function handleError(res, reason, message, code) {
        console.log('ERROR:', reason);
        res.status(code || 500).json({ 'error': message });
    };

    router.get('/', function (req, res) {
        collection.find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, 'Failed to get item.');
            } else {
                res.status(200).json(docs);
            }
        });
    });

    router.get('/:id', function (req, res) {
        collection.findOne({ _id: new _mongodb.ObjectID(req.params.id) }, function (err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to get item');
            } else {
                res.status(200).json(doc);
            }
        });
    });

    router.post('/', function (req, res) {
        var newContact = req.body;
        newContact.createDate = new Date();

        if (!(req.body.firstName || req.body.lastName)) {
            return handleError(res, 'Invalid user input', 'Must provide a first or last name.', 400);
        }

        collection.insertOne(newContact, function (err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to create new item.');
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    });

    router.put('/:id', function (req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        collection.updateOne({ _id: new _mongodb.ObjectID(req.params.id) }, updateDoc, function (err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to update item');
            } else {
                res.status(204).end();
            }
        });
    });

    router.delete('/:id', function (req, res) {
        collection.deleteOne({ _id: new _mongodb.ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                handleError(res, err.message, 'Failed to delete item');
            } else {
                res.status(204).end();
            }
        });
    });

    return router;
};
//# sourceMappingURL=index.js.map