const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require("axios");
const tz = require('moment-timezone');
const favicon = require('serve-favicon');
const compression = require('compression');
const morgan = require('morgan');
const useragent = require('useragent');
require('dotenv').config();
// const { Pool } = require('pg');
const server = express();
const pkg = require('./package.json');

// const config = require('../config.js');
const indexHtml = fs.readFileSync(path.join(__dirname, './src/index.html'), 'utf8');
const _get = require('./serverHelpers/_');

// global.pgPool = new Pool({
//   user: config.pgUser,
//   host: config.pgHost,
//   database: config.pgDatabase,
//   password: config.pgPassword,
//   port: config.pgPort,
// })

server.use(morgan((tokens, req, res) => {
    return [
        _get(() => useragent.parse(req.headers['user-agent']).toString()) || 'unknownUA',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
}));
server.use(compression());

server.use(cors());
server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

console.log('process.env.FB_PATH:', process.env.FB_PATH);
server.use(express.static(path.join(__dirname, process.env.NODE_ENV === 'dev' ? 'dist' : 'dist')));
// server.use(favicon('dist'));

server.get('*', (req, res, next) => {

    console.log(process.env.NODE_ENV);
    const cssPath = (process.env.NODE_ENV === 'dev' ? '/styles.css' : `/${pkg.name}.${pkg.version}.min.css`);
    const jsPath = (process.env.NODE_ENV === 'dev' ? '/client.js' : `/${pkg.name}.${pkg.version}.min.js`);
    console.log(cssPath, jsPath);
    res.send(
        indexHtml.replace('__CSS__', cssPath).replace('__JS__', jsPath)
    );
});

// server.get('/vehicle/:route', (req, res, next) => {
//     console.time('/vehicle duration');
//     // console.timeEnd('/vehicle duration');
//     // return res.json(mockSiri.Siri.VehicleMonitoringDelivery[0].VehicleActivity[0].MonitoredVehicleJourney);
//     const route = _get(() => req.params.route);

//     if (!route) {
//         console.log('no route');
//         return res.json([]);
//     }

//     axios(`http://api.rideuta.com/SIRI/SIRI.svc/VehicleMonitor/ByRoute?route=${route}&onwardcalls=true&usertoken=${utaApiKey}`).then(response => {
//         xml2js(response.data, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.json([]);
//             }
//             console.timeEnd('/vehicle duration');
//             return res.json(_get(() => result.Siri.VehicleMonitoringDelivery[0].VehicleActivity[0].MonitoredVehicleJourney) || []);
//         });
//     }).catch(err => {
//         console.log(err)
//         return res.json([]);
//     });
// });

// server.get('/shape/:route', (req, res, next) => {
//     console.time('/shape duration');

//     const route = _get(() => req.params.route);
//     const query = {
//         // give the query a unique name
//         name: 'get-route',
//         text: `
//             SELECT shpsTbl.shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence, shape_dist_traveled
//               FROM   public.shapes shpsTbl,
//                      (SELECT *
//                       FROM   (SELECT route_id,
//                                      shape_id
//                               FROM   public.trips
//                               WHERE  route_id=$1
//                               GROUP  BY route_id,
//                                         shape_id) trip_shapes,
//                              (SELECT shape_id AS shpId,
//                                      Count(1) AS pointCount
//                               FROM   public.shapes
//                               GROUP  BY shape_id) ptCnt
//                       WHERE  trip_shapes.shape_id = ptCnt.shpid
//                       ORDER  BY ptCnt.pointcount DESC
//                       LIMIT  1) AS shpsHighestCount
//               WHERE  shpsTbl.shape_id = shpsHighestCount.shape_id
//         `,
//         values: [route]
//     };

//     pgPool.query(query)
//     .then(result => {
//         console.timeEnd('/shape duration');
//         return res.json(result.rows);
//     }).catch(e => {
//         return res.json({
//             err: e.stack
//         });
//     });
// });

const port = (process.env.NODE_ENV === 'dev') ? 3000 : 4000;
server.listen(port, function() {
    console.log(`Listening on port ${port} @ ${tz().tz('America/Boise').format('MMM DD, YYYY - hh:mm:ssa')} (mt)`);
});
