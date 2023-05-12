import express from 'express';
import {ObjectID} from 'mongodb';

import {Scraper} from './Scraper';

export default (db) => {

    const router = express.Router({mergeParams: true});

    router.get('/', (req, res) => {
        const scraper = new Scraper();

        scraper.crawl()
            .then((output) => {
                res.status(200).send(JSON.stringify(output));
            })
            .catch((errCode)=>{
                res.status(500).send(JSON.stringify({error: errCode}));
            })
    });


    return router;

}

