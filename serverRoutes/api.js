const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');

/* GET endpoint */
router.get('/endpoint', function(req, res, next) {
    request('https://url.com', function(error, response, body) {
        if (error || !body || body === undefined) {
            return res.json({'success': false});
        }
        return res.json({'success': true, 'data': JSON.parse(body)});
    });
});

module.exports = router;
