const express = require('express');
const router = express.Router();

/* GET endpoint */
router.get('/fbconfig', function(req, res, next) {
    // these values are stored as config vars (environment variables) in heroku
    // client app calls these on start
    return res.json({
        "apiKey": process.env.apiKey,
        "authDomain": process.env.authDomain,
        "databaseURL": process.env.databaseURL,
        "projectId": process.env.projectId,
        "storageBucket": process.env.storageBucket,
        "messagingSenderId": process.env.messagingSenderId
    });
});

module.exports = router;
