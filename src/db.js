import * as mongodb from 'mongodb';

export default callback => {
    // connect to a database if needed, then pass it to `callback`:
    mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        callback(database);

    });
}
