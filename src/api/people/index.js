import express from 'express';
import {ObjectID} from 'mongodb';

export default (db) => {

    const collection = db.collection('mycollection');
    const router = express.Router({mergeParams: true});

    let handleError = function (res, reason, message, code) {
        console.log('ERROR:', reason);
        res.status(code || 500).json({'error': message});
    };

    router.get('/', (req, res) => {
        collection.find({}).toArray((err, docs) => {
            if (err) {
                handleError(res, err.message, 'Failed to get item.');
            } else {
                res.status(200).json(docs);
            }
        });
    });

    router.get('/:id', (req, res) => {
        collection.findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to get item');
            } else {
                res.status(200).json(doc);
            }
        });
    });

    router.post('/', (req, res) => {
        const newContact = req.body;
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

        collection.updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to update item');
            } else {
                res.status(204).end();
            }
        });
    });

    router.delete('/:id', function (req, res) {
        collection.deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
            if (err) {
                handleError(res, err.message, 'Failed to delete item');
            } else {
                res.status(204).end();
            }
        });
    });

    return router;

}

