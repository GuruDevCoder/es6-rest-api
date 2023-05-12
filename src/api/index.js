import {version} from '../../package.json';
import {Router} from 'express';
import homedoc from './home';
import getset from './people';
import scraper from './scraper';

export default (db) => {
    let api = Router();

    api.get('/', (req, res) => {
        res.json({version});
    });

    api.use('/home', homedoc(db));
    api.use('/people', getset(db));
    api.use('/scrape', scraper(db));

    return api;
}
