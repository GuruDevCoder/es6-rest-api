import express from 'express';

export default () => {

    let router = express.Router({mergeParams: true});

    router.get('/', function (req, res) {

        const context = {
            exampleString: 'visitor'
        };

        const template = __dirname + '/views/homedoc';
        return res.status(200).render(template, context);

    });

    return router;

}
