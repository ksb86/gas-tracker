const Pool = require('pg').Pool;
const config = require('../config.json');

try {
    global.pgPool = new Pool({
        user: config.pgUser,
        password: config.pgPass,
        host: config.pgHost,
        database: config.pgDB,
        port: config.pgPort
    });
} catch (error) {
    console.log('pgpool error', error);
}

pgPool.query(`INSERT INTO gas_entries (miles, odometer, ppg, total, vehicle, timestamp) VALUES (123, 1234, 1.23, 32.23, 'crv', 1560487294993);`).then(insertResult => {
    console.log('insertResult.rowCount: ', insertResult.rowCount);
    // res.status(200).send(result.rows[0].id ? 'OK' : 'not OK 1');
}).catch(err => {
    console.log(err);
    // res.status(400).send('not OK 2');
});


pgPool.query(`SELECT * FROM gas_entries;`).then(selectResult => {
    console.log(selectResult.rows);
    // res.status(200).send(result.rows[0].id ? 'OK' : 'not OK 1');
}).catch(err => {
    console.log(err);
    // res.status(400).send('not OK 2');
});
